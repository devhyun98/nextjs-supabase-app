'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { profileSchema, ProfileFormData } from '@/lib/schemas/profile';
import { currentUser } from '@/lib/data/current-user';

export default function EditProfilePage() {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser.name,
      avatarUrl: currentUser.avatarUrl || '',
    },
  });

  const avatarUrl = watch('avatarUrl');

  const onSubmit = async (data: any) => {
    try {
      toast.success('프로필이 업데이트되었습니다 (데모)');
      // 더미 데이터이므로 실제 저장 없음
      setTimeout(() => {
        router.push('/profile');
      }, 500);
    } catch (error) {
      toast.error('오류가 발생했습니다');
    }
  };

  const initials = currentUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-full max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">프로필 수정</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 아바타 미리보기 */}
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarUrl || currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">이미지 URL을 변경하면 위 미리보기가 업데이트됩니다</p>
        </div>

        {/* 이름 */}
        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            placeholder="이름을 입력해주세요"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* 아바타 URL */}
        <div className="space-y-2">
          <Label htmlFor="avatarUrl">아바타 이미지 URL</Label>
          <Input
            id="avatarUrl"
            placeholder="https://example.com/avatar.jpg"
            {...register('avatarUrl')}
          />
          {errors.avatarUrl && (
            <p className="text-sm text-red-500">{errors.avatarUrl.message}</p>
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
            {isSubmitting ? '저장 중...' : '저장하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
