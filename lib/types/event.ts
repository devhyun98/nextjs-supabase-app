export type EventStatus = 'upcoming' | 'ongoing' | 'ended';
export type ParticipantRole = 'host' | 'participant';

export interface Event {
  id: string;
  title: string;
  description?: string;
  location: string;
  eventDate: Date | string;
  coverImageUrl?: string;
  inviteCode: string;
  status: EventStatus;
  createdBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  role: ParticipantRole;
  joinedAt: Date | string;
}

export interface EventWithHost extends Event {
  host?: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface EventWithParticipants extends Event {
  participants?: (EventParticipant & { user?: User })[];
  participantCount?: number;
}
