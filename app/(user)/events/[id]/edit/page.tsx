export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { EventForm } from '@/components/events/event-form';
import { getEventById } from '@/lib/data/dummy-events';

interface EditEventPageProps {
  params: {
    id: string;
  };
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const event = getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="w-full max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">이벤트 수정</h1>
      <EventForm mode="edit" defaultValues={event} />
    </div>
  );
}
