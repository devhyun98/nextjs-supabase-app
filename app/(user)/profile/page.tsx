'use client';

import Link from 'next/link';
import { Edit, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser } from '@/lib/data/current-user';
import { getEventsByUser } from '@/lib/data/dummy-events';
import { logoutAction } from '@/app/actions/auth';

export default function ProfilePage() {
  const events = getEventsByUser(currentUser.id);
  const createdEvents = events.filter((e) => e.createdBy === currentUser.id);
  const participatedEvents = events.filter((e) => e.createdBy !== currentUser.id);

  const initials = currentUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-full max-w-2xl px-4 py-8 space-y-8">
      {/* 프로필 정보 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>내 프로필</CardTitle>
          <div className="flex gap-2">
            <Link href="/profile/edit">
              <Button size="sm" variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                수정
              </Button>
            </Link>
            <form action={logoutAction}>
              <Button type="submit" size="sm" variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p className="text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">주최한 이벤트</p>
              <p className="text-3xl font-bold">{createdEvents.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">참여한 이벤트</p>
              <p className="text-3xl font-bold">{participatedEvents.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
