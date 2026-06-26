'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { eventSchema, EventFormData } from '@/lib/schemas/event';
import { Event } from '@/lib/types/event';

interface EventFormProps {
  mode: 'create' | 'edit';
  defaultValues?: Event;
}

export function EventForm({ mode, defaultValues }: EventFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues
      ? {
          title: defaultValues.title,
          description: defaultValues.description || '',
          location: defaultValues.location,
          eventDate: new Date(defaultValues.eventDate),
          coverImageUrl: defaultValues.coverImageUrl || '',
        }
      : {
          title: '',
          description: '',
          location: '',
          eventDate: new Date(),
          coverImageUrl: '',
        },
  });

  const onSubmit = async (data: any) => {
    try {
      if (mode === 'create') {
        const response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '이벤트 생성에 실패했습니다');
        }

        toast.success('이벤트가 생성되었습니다');
      }

      setTimeout(() => {
        router.push('/events');
      }, 500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '오류가 발생했습니다';
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 제목 */}
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          placeholder="이벤트 제목을 입력해주세요"
          {...register('title')}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* 설명 */}
      <div className="space-y-2">
        <Label htmlFor="description">설명 (선택사항)</Label>
        <Textarea
          id="description"
          placeholder="이벤트 설명을 입력해주세요"
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* 장소 */}
      <div className="space-y-2">
        <Label htmlFor="location">장소</Label>
        <Input
          id="location"
          placeholder="이벤트 장소를 입력해주세요"
          {...register('location')}
        />
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>

      {/* 날짜 */}
      <div className="space-y-2">
        <Label htmlFor="eventDate">날짜</Label>
        <Input
          id="eventDate"
          type="datetime-local"
          {...register('eventDate', {
            setValueAs: (value) => new Date(value),
          })}
        />
        {errors.eventDate && (
          <p className="text-sm text-red-500">{errors.eventDate.message}</p>
        )}
      </div>

      {/* 커버 이미지 URL */}
      <div className="space-y-2">
        <Label htmlFor="coverImageUrl">커버 이미지 URL (선택사항)</Label>
        <Input
          id="coverImageUrl"
          placeholder="https://example.com/image.jpg"
          {...register('coverImageUrl')}
        />
        {errors.coverImageUrl && (
          <p className="text-sm text-red-500">{errors.coverImageUrl.message}</p>
        )}
      </div>

      {/* 제출 버튼 */}
      <div className="flex gap-3 pt-6">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : mode === 'create' ? '이벤트 만들기' : '수정하기'}
        </Button>
      </div>
    </form>
  );
}
