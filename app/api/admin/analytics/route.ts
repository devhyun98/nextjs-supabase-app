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

    const { data: eventsByDate, error: eventsError } = await supabase
      .rpc('get_events_by_date')

    const { data: participantsByDate, error: participantsError } =
      await supabase.rpc('get_participants_by_date')

    if (eventsError || participantsError) {
      console.log(
        '집계 함수가 없는 경우, 기본 데이터 반환:',
        eventsError,
        participantsError
      )

      const { data: events } = await supabase
        .from('events')
        .select('created_at')
        .order('created_at', { ascending: true })

      const eventsByDateMap: Record<string, number> = {}
      events?.forEach((event) => {
        const date = new Date(event.created_at).toISOString().split('T')[0]
        eventsByDateMap[date] = (eventsByDateMap[date] || 0) + 1
      })

      const eventChartData = Object.entries(eventsByDateMap).map(
        ([date, count]) => ({
          date,
          events: count,
        })
      )

      return NextResponse.json({
        events: eventChartData,
        participants: [],
      })
    }

    return NextResponse.json({
      events: eventsByDate || [],
      participants: participantsByDate || [],
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
