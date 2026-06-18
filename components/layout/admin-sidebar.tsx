'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BarChart3, Users, Calendar, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    label: '대시보드 메인',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: '이벤트 관리',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    label: '사용자 관리',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: '통계 분석',
    href: '/admin/analytics',
    icon: BarChart3,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-gray-900 text-gray-100 flex flex-col border-r border-gray-800">
      {/* 로고 영역 */}
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <Link href="/admin/dashboard" className="text-xl font-bold text-emerald-400">
          Gather
        </Link>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href.slice(0, -10));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium',
                'transition-colors duration-200',
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 로그아웃 */}
      <div className="px-4 py-4 border-t border-gray-800">
        <Link
          href="/auth/login"
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium',
            'transition-colors duration-200',
            'text-red-400 hover:bg-gray-800'
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span>로그아웃</span>
        </Link>
      </div>
    </aside>
  );
}
