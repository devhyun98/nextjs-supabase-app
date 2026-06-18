import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(50, '이름은 50자 이하여야 합니다'),
  avatarUrl: z
    .string()
    .default(''),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
