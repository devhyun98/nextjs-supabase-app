import { EventForm } from '@/components/events/event-form';

export default function CreateEventPage() {
  return (
    <div className="w-full max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">새 이벤트 만들기</h1>
      <EventForm mode="create" />
    </div>
  );
}
