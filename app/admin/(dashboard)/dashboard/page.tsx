'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { getAdminDashboardStats } from '@/lib/data/dummy-admin-stats';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const stats = getAdminDashboardStats();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
        <p className="text-muted-foreground mt-2">플랫폼 전체 통계를 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="오늘 이벤트"
          value={stats.today.eventsCount}
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="이번주 이벤트"
          value={stats.thisWeek.eventsCount}
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="이번달 이벤트"
          value={stats.thisMonth.eventsCount}
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="전체 이벤트"
          value={stats.total.eventsCount}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* 사용자 통계 */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <StatCard
          title="오늘 가입"
          value={stats.today.usersCount}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="이번주 가입"
          value={stats.thisWeek.usersCount}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="전체 사용자"
          value={stats.total.usersCount}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
    </div>
  );
}
