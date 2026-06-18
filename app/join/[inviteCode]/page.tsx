'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EventStatusBadge } from '@/components/events/event-status-badge';
import { toast } from 'sonner';
import { getEventByInviteCode, getParticipantsByEvent } from '@/lib/data/dummy-events';
import { EmptyState } from '@/components/empty-state';
import { AlertCircle } from 'lucide-react';

interface JoinPageProps {
  params: {
    inviteCode: string;
  };
}

export default function JoinPage({ params }: JoinPageProps) {
  const router = useRouter();
  const event = getEventByInviteCode(params.inviteCode);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로가기
          </Button>
          <EmptyState
            icon={AlertCircle}
            title="유효하지 않은 초대 코드"
            description="이 초대 코드는 존재하지 않거나 만료되었습니다. 정확한 초대 코드를 다시 확인해주세요."
          />
        </div>
      </div>
    );
  }

  const participants = getParticipantsByEvent(event.id);
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(event.eventDate));

  const handleJoin = () => {
    toast.success('이벤트에 참여했습니다 (데모)');
    // 데모라서 실제 참여 처리 없음
    setTimeout(() => {
      router.push(`/events/${event.id}`);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          뒤로가기
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">이벤트 참여</CardTitle>
            <CardDescription>다음 이벤트에 참여하도록 초대되었습니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 커버 이미지 */}
            {event.coverImageUrl ? (
              <img
                src={event.coverImageUrl}
                alt={event.title}
                className="w-full aspect-video object-cover rounded-lg"
              />
            ) : (
              <div className="w-full aspect-video bg-linear-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                <span className="text-slate-400">이미지 없음</span>
              </div>
            )}

            {/* 이벤트 제목 */}
            <div>
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <EventStatusBadge status={event.status} />
            </div>

            {/* 이벤트 정보 */}
            <div className="space-y-3 py-4 border-y">
              <div>
                <p className="text-sm text-muted-foreground mb-1">날짜 및 시간</p>
                <p className="font-medium text-sm">{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">장소</p>
                <p className="font-medium text-sm">{event.location}</p>
              </div>
              {event.description && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">설명</p>
                  <p className="text-sm">{event.description}</p>
                </div>
              )}
            </div>

            {/* 참여자 수 */}
            <div className="text-sm text-muted-foreground">
              현재 <span className="font-medium text-foreground">{participants.length}명</span>이 참여하고 있습니다
            </div>

            {/* 참여 버튼 */}
            <Button onClick={handleJoin} className="w-full">
              이벤트에 참여하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
