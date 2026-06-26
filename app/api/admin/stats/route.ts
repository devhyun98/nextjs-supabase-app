import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      )
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: '프로필을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    if (profile.role !== 'admin') {
      return NextResponse.json(
        { error: '관리자만 접근 가능합니다' },
        { status: 403 }
      )
    }

    const { count: totalEvents, error: eventsError } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })

    const { count: totalUsers, error: usersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    const { count: totalParticipants, error: participantsError } =
      await supabase
        .from('event_participants')
        .select('*', { count: 'exact', head: true })

    if (eventsError || usersError || participantsError) {
      console.error(
        '통계 조회 오류:',
        eventsError,
        usersError,
        participantsError
      )
      return NextResponse.json(
        { error: '통계 조회에 실패했습니다' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      totalEvents: totalEvents || 0,
      totalUsers: totalUsers || 0,
      totalParticipants: totalParticipants || 0,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
