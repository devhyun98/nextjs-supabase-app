export interface AdminDashboardStats {
  today: {
    eventsCount: number;
    usersCount: number;
  };
  thisWeek: {
    eventsCount: number;
    usersCount: number;
  };
  thisMonth: {
    eventsCount: number;
  };
  total: {
    eventsCount: number;
    usersCount: number;
  };
}

export interface AdminEventRow {
  id: string;
  title: string;
  hostName: string;
  eventDate: string | Date;
  participantCount: number;
  status: 'upcoming' | 'ongoing' | 'ended';
  createdAt: string | Date;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string | Date;
  createdEventsCount: number;
  participatedEventsCount: number;
}

export interface AnalyticsDataPoint {
  date: string;
  events: number;
  users: number;
}
