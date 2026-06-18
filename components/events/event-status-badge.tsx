import { EventStatus } from '@/lib/types/event';
import { Badge } from '@/components/ui/badge';

interface EventStatusBadgeProps {
  status: EventStatus;
}

export function EventStatusBadge({ status }: EventStatusBadgeProps) {
  const statusConfig = {
    upcoming: { label: '예정중', variant: 'default' as const },
    ongoing: { label: '진행중', variant: 'secondary' as const },
    ended: { label: '종료됨', variant: 'outline' as const },
  };

  const { label, variant } = statusConfig[status];

  return <Badge variant={variant}>{label}</Badge>;
}
