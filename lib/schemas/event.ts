import { z } from 'zod';

export const eventSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(50, '제목은 50자 이하여야 합니다'),
  description: z
    .string()
    .max(500, '설명은 500자 이하여야 합니다')
    .default(''),
  location: z
    .string()
    .min(1, '장소를 입력해주세요')
    .max(100, '장소는 100자 이하여야 합니다'),
  eventDate: z.date(),
  coverImageUrl: z
    .string()
    .default(''),
});

export type EventFormData = z.infer<typeof eventSchema>;
