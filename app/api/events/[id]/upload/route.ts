import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      )
    }

    const { data: event, error: fetchError } = await supabase
      .from('events')
      .select('created_by, cover_image_url')
      .eq('id', id)
      .single()

    if (fetchError || !event) {
      return NextResponse.json(
        { error: '이벤트를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    if (event.created_by !== user.id) {
      return NextResponse.json(
        { error: '이미지를 업로드할 권한이 없습니다' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: '파일을 선택해주세요' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'JPG, PNG, WebP, GIF 형식의 이미지만 업로드 가능합니다' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '파일 크기는 5MB 이하여야 합니다' },
        { status: 400 }
      )
    }

    if (event.cover_image_url) {
      const fileName = event.cover_image_url.split('/').pop()
      if (fileName) {
        await supabase.storage.from('event-covers').remove([fileName])
      }
    }

    const fileName = `${id}-${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('event-covers')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json(
        { error: '이미지 업로드에 실패했습니다' },
        { status: 400 }
      )
    }

    const { data } = supabase.storage
      .from('event-covers')
      .getPublicUrl(uploadData.path)

    const publicUrl = data.publicUrl

    const { error: updateError } = await supabase
      .from('events')
      .update({
        cover_image_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      console.error('Database update error:', updateError)
      return NextResponse.json(
        { error: '이미지 정보 저장에 실패했습니다' },
        { status: 400 }
      )
    }

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
