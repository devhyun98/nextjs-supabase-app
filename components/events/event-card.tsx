'use client';

import Link from 'next/link';
import { EventWithParticipants } from '@/lib/types/event';
import { Card, CardContent } from '@/components/ui/card';
import { EventStatusBadge } from '@/components/events/event-status-badge';

interface EventCardProps {
  event: EventWithParticipants;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date(event.eventDate));

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        {/* 커버 이미지 (16:9) */}
        {event.coverImageUrl ? (
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="w-full aspect-video object-cover"
          />
        ) : (
          <div className="w-full aspect-video bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <span className="text-slate-400 text-sm">이미지 없음</span>
          </div>
        )}

        <CardContent className="p-4 space-y-3">
          {/* 제목 */}
          <h3 className="font-semibold text-base line-clamp-2">{event.title}</h3>

          {/* 날짜와 장소 */}
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>{formattedDate}</p>
            <p className="line-clamp-1">{event.location}</p>
          </div>

          {/* 참여자 수와 상태 */}
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-xs text-muted-foreground">
              참여자 {event.participantCount || 0}명
            </span>
            <EventStatusBadge status={event.status} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
