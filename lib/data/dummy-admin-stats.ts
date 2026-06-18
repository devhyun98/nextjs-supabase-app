import { dummyEvents, dummyUsers, dummyParticipants } from './dummy-events';
import { AdminDashboardStats, AnalyticsDataPoint } from '@/lib/types/admin';

export function getAdminDashboardStats(): AdminDashboardStats {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
  thisWeekStart.setHours(0, 0, 0, 0);

  const thisMonthStart = new Date(now);
  thisMonthStart.setDate(1);
  thisMonthStart.setHours(0, 0, 0, 0);

  const todayEvents = dummyEvents.filter(e => {
    const eventDate = new Date(e.createdAt);
    return eventDate >= today && eventDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
  });

  const thisWeekEvents = dummyEvents.filter(e => {
    const eventDate = new Date(e.createdAt);
    return eventDate >= thisWeekStart;
  });

  const thisMonthEvents = dummyEvents.filter(e => {
    const eventDate = new Date(e.createdAt);
    return eventDate >= thisMonthStart;
  });

  const todayUsers = dummyUsers.filter(u => {
    const userDate = new Date(u.createdAt);
    return userDate >= today && userDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
  });

  const thisWeekUsers = dummyUsers.filter(u => {
    const userDate = new Date(u.createdAt);
    return userDate >= thisWeekStart;
  });

  return {
    today: {
      eventsCount: todayEvents.length,
      usersCount: todayUsers.length,
    },
    thisWeek: {
      eventsCount: thisWeekEvents.length,
      usersCount: thisWeekUsers.length,
    },
    thisMonth: {
      eventsCount: thisMonthEvents.length,
    },
    total: {
      eventsCount: dummyEvents.length,
      usersCount: dummyUsers.length,
    },
  };
}

export function getAnalyticsData(days: 7 | 30 | 90 = 7): AnalyticsDataPoint[] {
  const result: AnalyticsDataPoint[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dayEvents = dummyEvents.filter(e => {
      const eventDate = new Date(e.createdAt);
      return eventDate >= date && eventDate < nextDate;
    }).length;

    const dayUsers = dummyUsers.filter(u => {
      const userDate = new Date(u.createdAt);
      return userDate >= date && userDate < nextDate;
    }).length;

    result.push({
      date: date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      events: dayEvents,
      users: dayUsers,
    });
  }

  return result;
}
