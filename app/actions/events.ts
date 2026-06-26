'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function joinEventAction(inviteCode: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('인증되지 않은 사용자입니다')
  }

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id, invite_code')
    .eq('invite_code', inviteCode)
    .single()

  if (eventError || !event) {
    throw new Error('이벤트를 찾을 수 없습니다')
  }

  const { data: existingParticipant, error: checkError } = await supabase
    .from('event_participants')
    .select('id')
    .eq('event_id', event.id)
    .eq('user_id', user.id)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    throw new Error('참여자 확인 중 오류가 발생했습니다')
  }

  if (existingParticipant) {
    throw new Error('이미 참여한 이벤트입니다')
  }

  const { error: insertError } = await supabase
    .from('event_participants')
    .insert([
      {
        event_id: event.id,
        user_id: user.id,
        joined_at: new Date().toISOString(),
      },
    ])

  if (insertError) {
    console.error('Participant insert error:', insertError)
    throw new Error('이벤트 참여에 실패했습니다')
  }

  redirect(`/events/${event.id}`)
}
