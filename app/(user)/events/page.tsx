'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, CalendarPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/events/event-card';
import { EmptyState } from '@/components/empty-state';
import { EventCardSkeleton } from '@/components/events/event-card-skeleton';
import { getEventsByUser } from '@/lib/data/dummy-events';
import { CURRENT_USER_ID } from '@/lib/data/current-user';
import { EventStatus } from '@/lib/types/event';

export default function EventsPage() {
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // 더미 데이터에서 현재 사용자의 이벤트 가져오기
  const allEvents = useMemo(() => getEventsByUser(CURRENT_USER_ID), []);

  // 상태로 필터링
  const filteredEvents = useMemo(() => {
    if (selectedStatus === 'all') return allEvents;
    return allEvents.filter((event) => event.status === selectedStatus);
  }, [allEvents, selectedStatus]);

  if (isLoading) {
    return (
      <div className="w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">내 이벤트</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">내 이벤트</h1>
      </div>

      {/* 상태 탭 */}
      <Tabs
        value={selectedStatus}
        onValueChange={(value) => setSelectedStatus(value as EventStatus | 'all')}
        className="mb-8"
      >
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="upcoming">예정중</TabsTrigger>
          <TabsTrigger value="ongoing">진행중</TabsTrigger>
          <TabsTrigger value="ended">종료됨</TabsTrigger>
        </TabsList>

        {/* 이벤트 그리드 */}
        <TabsContent value={selectedStatus} className="mt-6">
          {filteredEvents.length === 0 ? (
            <EmptyState
              icon={CalendarPlus}
              title="이벤트가 없습니다"
              description={
                selectedStatus === 'all'
                  ? '아직 만든 이벤트가 없습니다. 새로운 이벤트를 만들어보세요!'
                  : `${selectedStatus === 'upcoming' ? '예정중' : selectedStatus === 'ongoing' ? '진행중' : '종료된'} 이벤트가 없습니다.`
              }
              action={
                selectedStatus === 'all'
                  ? {
                      label: '새 이벤트 만들기',
                      href: '/events/create',
                    }
                  : undefined
              }
            />
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* 플로팅 액션 버튼 (모바일) */}
      <Link href="/events/create" className="fixed bottom-20 right-4 md:hidden">
        <Button size="lg" className="rounded-full h-14 w-14 p-0 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </Link>

      {/* 데스크톱 만들기 버튼 */}
      <div className="hidden md:flex justify-end mt-8">
        <Link href="/events/create">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            새 이벤트 만들기
          </Button>
        </Link>
      </div>
    </div>
  );
}
