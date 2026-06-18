import { EventStatus } from "@/lib/types/event"

/**
 * Calculate event status based on event_date
 * Status는 DB에 저장하지 않고, 항상 event_date를 기준으로 계산합니다.
 * 이를 통해 상태 동기화 문제를 원천적으로 차단합니다.
 */
export function getEventStatus(eventDate: Date | string): EventStatus {
  const now = new Date()
  const date = typeof eventDate === "string" ? new Date(eventDate) : eventDate

  // 이벤트가 시작되지 않았으면 upcoming
  if (date > now) {
    return "upcoming"
  }

  // 이벤트가 끝났으면 ended
  // 간단함을 위해 이벤트 날짜가 과거면 ended로 처리
  // 실제로는 이벤트 기간(duration)을 DB에 저장해야 하지만, 현재 스키마에는 없음
  return "ended"
}

/**
 * Check if event is upcoming
 */
export function isUpcoming(eventDate: Date | string): boolean {
  return getEventStatus(eventDate) === "upcoming"
}

/**
 * Check if event has ended
 */
export function hasEnded(eventDate: Date | string): boolean {
  return getEventStatus(eventDate) === "ended"
}
