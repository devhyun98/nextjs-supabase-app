import { createClient } from '@/lib/supabase/server'
import { eventSchema } from '@/lib/schemas/event'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
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

    const body = await request.json()

    const validatedFields = eventSchema.safeParse({
      title: body.title,
      description: body.description,
      location: body.location,
      eventDate: new Date(body.eventDate),
      coverImageUrl: body.coverImageUrl,
    })

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: '입력된 정보를 확인해주세요',
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { data: event, error: fetchError } = await supabase
      .from('events')
      .select('created_by')
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
        { error: '이벤트를 수정할 권한이 없습니다' },
        { status: 403 }
      )
    }

    const { data, error } = await supabase
      .from('events')
      .update({
        title: validatedFields.data.title,
        description: validatedFields.data.description || null,
        location: validatedFields.data.location,
        event_date: validatedFields.data.eventDate.toISOString(),
        cover_image_url: validatedFields.data.coverImageUrl || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json(
        { error: error.message || '이벤트 수정에 실패했습니다' },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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
        { error: '이벤트를 삭제할 권한이 없습니다' },
        { status: 403 }
      )
    }

    if (event.cover_image_url) {
      const fileName = event.cover_image_url.split('/').pop()
      if (fileName) {
        await supabase.storage.from('event-covers').remove([fileName])
      }
    }

    const { error } = await supabase.from('events').delete().eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      return NextResponse.json(
        { error: error.message || '이벤트 삭제에 실패했습니다' },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
