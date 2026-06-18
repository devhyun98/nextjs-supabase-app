import { Event, EventParticipant, User } from '@/lib/types/event';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const dummyUsers: User[] = [
  {
    id: 'user-1',
    email: 'demo@gather.app',
    name: '데모 사용자',
    avatarUrl: 'https://avatar.vercel.sh/demo',
    role: 'user',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-06-18'),
  },
  {
    id: 'user-2',
    email: 'alice@gather.app',
    name: '앨리스',
    avatarUrl: 'https://avatar.vercel.sh/alice',
    role: 'user',
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-06-18'),
  },
  {
    id: 'user-3',
    email: 'bob@gather.app',
    name: '밥',
    avatarUrl: 'https://avatar.vercel.sh/bob',
    role: 'user',
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-06-18'),
  },
  {
    id: 'user-4',
    email: 'carol@gather.app',
    name: '캐롤',
    avatarUrl: 'https://avatar.vercel.sh/carol',
    role: 'user',
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-06-18'),
  },
  {
    id: 'user-5',
    email: 'david@gather.app',
    name: '데이비드',
    avatarUrl: 'https://avatar.vercel.sh/david',
    role: 'user',
    createdAt: new Date('2026-03-15'),
    updatedAt: new Date('2026-06-18'),
  },
  {
    id: 'admin-1',
    email: 'admin@gather.app',
    name: '관리자',
    avatarUrl: 'https://avatar.vercel.sh/admin',
    role: 'admin',
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date('2026-06-18'),
  },
];

export const dummyEvents: Event[] = [
  {
    id: 'event-1',
    title: '민준이 생일 파티',
    description: '민준이 27번째 생일을 축하하는 파티입니다. 맛있는 음식과 게임이 준비되어 있습니다.',
    location: '서울 강남구 카페 라떼',
    eventDate: tomorrow,
    coverImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=300&fit=crop',
    inviteCode: 'abc123',
    status: 'upcoming',
    createdBy: 'user-1',
    createdAt: new Date('2026-06-10'),
    updatedAt: new Date('2026-06-18'),
  },
  {
    id: 'event-2',
    title: '팀 빌딩 워크샵',
    description: '팀의 결속력을 높이기 위한 워크샵입니다.',
    location: '서울 중구 컨퍼런스홀',
    eventDate: nextWeek,
    coverImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    inviteCode: 'def456',
    status: 'upcoming',
    createdBy: 'user-1',
    createdAt: new Date('2026-06-15'),
    updatedAt: new Date('2026-06-18'),
  },
  {
    id: 'event-3',
    title: '하이킹 모임',
    description: '남산 트레킹 후 팀 저녁 식사',
    location: '서울 용산구 남산 입구',
    eventDate: yesterday,
    coverImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    inviteCode: 'ghi789',
    status: 'ended',
    createdBy: 'user-2',
    createdAt: new Date('2026-06-01'),
    updatedAt: new Date('2026-06-17'),
  },
  {
    id: 'event-4',
    title: '디자인 토론 세션',
    description: '신규 프로젝트 디자인에 대한 의견 수렴',
    location: '온라인 (Zoom)',
    eventDate: new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000),
    coverImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    inviteCode: 'jkl012',
    status: 'upcoming',
    createdBy: 'user-3',
    createdAt: new Date('2026-06-12'),
    updatedAt: new Date('2026-06-18'),
  },
];

export const dummyParticipants: EventParticipant[] = [
  // event-1 참여자
  {
    id: 'participant-1',
    eventId: 'event-1',
    userId: 'user-1',
    role: 'host',
    joinedAt: new Date('2026-06-10'),
  },
  {
    id: 'participant-2',
    eventId: 'event-1',
    userId: 'user-2',
    role: 'participant',
    joinedAt: new Date('2026-06-11'),
  },
  {
    id: 'participant-3',
    eventId: 'event-1',
    userId: 'user-3',
    role: 'participant',
    joinedAt: new Date('2026-06-12'),
  },
  {
    id: 'participant-4',
    eventId: 'event-1',
    userId: 'user-4',
    role: 'participant',
    joinedAt: new Date('2026-06-13'),
  },
  // event-2 참여자
  {
    id: 'participant-5',
    eventId: 'event-2',
    userId: 'user-1',
    role: 'host',
    joinedAt: new Date('2026-06-15'),
  },
  {
    id: 'participant-6',
    eventId: 'event-2',
    userId: 'user-2',
    role: 'participant',
    joinedAt: new Date('2026-06-16'),
  },
  {
    id: 'participant-7',
    eventId: 'event-2',
    userId: 'user-3',
    role: 'participant',
    joinedAt: new Date('2026-06-16'),
  },
  // event-3 참여자
  {
    id: 'participant-8',
    eventId: 'event-3',
    userId: 'user-2',
    role: 'host',
    joinedAt: new Date('2026-06-01'),
  },
  {
    id: 'participant-9',
    eventId: 'event-3',
    userId: 'user-1',
    role: 'participant',
    joinedAt: new Date('2026-06-02'),
  },
  {
    id: 'participant-10',
    eventId: 'event-3',
    userId: 'user-4',
    role: 'participant',
    joinedAt: new Date('2026-06-02'),
  },
  {
    id: 'participant-11',
    eventId: 'event-3',
    userId: 'user-5',
    role: 'participant',
    joinedAt: new Date('2026-06-03'),
  },
  // event-4 참여자
  {
    id: 'participant-12',
    eventId: 'event-4',
    userId: 'user-3',
    role: 'host',
    joinedAt: new Date('2026-06-12'),
  },
  {
    id: 'participant-13',
    eventId: 'event-4',
    userId: 'user-1',
    role: 'participant',
    joinedAt: new Date('2026-06-13'),
  },
];

export function getEventsByUser(userId: string): Event[] {
  const userEventIds = new Set(
    dummyParticipants
      .filter(p => p.userId === userId)
      .map(p => p.eventId)
  );
  return dummyEvents.filter(e => userEventIds.has(e.id));
}

export function getParticipantsByEvent(eventId: string) {
  const participants = dummyParticipants
    .filter(p => p.eventId === eventId)
    .map(p => ({
      ...p,
      user: dummyUsers.find(u => u.id === p.userId),
    }));
  return participants;
}

export function getUserById(userId: string) {
  return dummyUsers.find(u => u.id === userId);
}

export function getEventById(eventId: string) {
  return dummyEvents.find(e => e.id === eventId);
}

export function getEventByInviteCode(inviteCode: string) {
  return dummyEvents.find(e => e.inviteCode === inviteCode);
}
