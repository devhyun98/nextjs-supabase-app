'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Share2, Edit, Trash2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ParticipantCard } from '@/components/events/participant-card';
import { EventStatusBadge } from '@/components/events/event-status-badge';
import { toast } from 'sonner';
import { getEventById, getParticipantsByEvent } from '@/lib/data/dummy-events';
import { CURRENT_USER_ID } from '@/lib/data/current-user';

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const router = useRouter();
  const event = getEventById(params.id);
  const [copied, setCopied] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!event) {
    notFound();
  }

  const participants = getParticipantsByEvent(event.id);
  const isHost = event.createdBy === CURRENT_USER_ID;

  const handleCopyLink = async () => {
    const inviteUrl = `${window.location.origin}/join/${event.inviteCode}`;
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    toast.success('초대 링크가 복사되었습니다');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    toast.success('이벤트가 삭제되었습니다 (데모)');
    setShowDeleteDialog(false);
    router.push('/events');
  };

  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(event.eventDate));

  return (
    <div className="w-full max-w-4xl px-4 py-8 space-y-8">
      {/* 커버 이미지 */}
      {event.coverImageUrl ? (
        <img
          src={event.coverImageUrl}
          alt={event.title}
          className="w-full h-80 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-80 bg-linear-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
          <span className="text-slate-400">이미지 없음</span>
        </div>
      )}

      {/* 제목과 상태 */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <EventStatusBadge status={event.status} />
          </div>
          {isHost && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    링크 복사
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/events/${event.id}/edit`)}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                수정
              </Button>
              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    삭제
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>이벤트 삭제</DialogTitle>
                    <DialogDescription>
                      이 이벤트를 정말 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteDialog(false)}
                    >
                      취소
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                      삭제하기
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* 이벤트 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>이벤트 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">날짜 및 시간</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">장소</p>
            <p className="font-medium">{event.location}</p>
          </div>
          {event.description && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">설명</p>
              <p className="text-sm whitespace-pre-wrap">{event.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 참여자 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>참여자</CardTitle>
          <CardDescription>{participants.length}명이 참여하고 있습니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {participants.map((participant) => (
            <ParticipantCard key={participant.id} participant={participant} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
