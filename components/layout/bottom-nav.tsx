'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Plus, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/events') {
      return pathname === '/events' || pathname.startsWith('/events');
    }
    if (path === '/profile') {
      return pathname === '/profile' || pathname.startsWith('/profile');
    }
    return pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t border-border">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/events"
          className={cn(
            'flex flex-col items-center justify-center gap-1 w-full h-full',
            'text-xs font-medium transition-colors',
            isActive('/events')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Calendar className="h-6 w-6" />
          <span>내 이벤트</span>
        </Link>

        <Link
          href="/events/create"
          className={cn(
            'flex flex-col items-center justify-center gap-1 w-full h-full',
            'text-xs font-medium transition-colors',
            isActive('/events/create')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Plus className="h-6 w-6" />
          <span>만들기</span>
        </Link>

        <Link
          href="/profile"
          className={cn(
            'flex flex-col items-center justify-center gap-1 w-full h-full',
            'text-xs font-medium transition-colors',
            isActive('/profile')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <User className="h-6 w-6" />
          <span>프로필</span>
        </Link>
      </div>
    </nav>
  );
}
