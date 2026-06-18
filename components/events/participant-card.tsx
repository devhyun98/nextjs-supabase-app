'use client';

import { EventParticipant, User } from '@/lib/types/event';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ParticipantCardProps {
  participant: EventParticipant & { user?: User };
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
  const user = participant.user;
  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const roleLabel = participant.role === 'host' ? '주최자' : '참여자';
  const roleVariant = participant.role === 'host' ? 'default' : 'secondary';

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Badge variant={roleVariant}>{roleLabel}</Badge>
    </div>
  );
}
