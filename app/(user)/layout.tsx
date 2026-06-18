'use client';

import { Navbar } from '@/components/layout/navbar';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full pb-20 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
