'use client';

import Link from 'next/link';
import { LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { currentUser } from '@/lib/data/current-user';

export function Navbar() {
  return (
    <nav className="w-full border-b border-border bg-background">
      <div className="flex justify-center">
        <div className="w-full max-w-6xl flex justify-between items-center px-4 sm:px-6 h-16">
          <Link href="/events" className="text-lg font-bold text-primary">
            Gather
          </Link>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <UserIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm font-medium text-foreground">
                  {currentUser.name}
                </div>
                <div className="px-2 text-xs text-muted-foreground mb-2">
                  {currentUser.email}
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/profile">프로필</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/login" className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
