import { z } from 'zod';

export const schema = z.object({
  phone: z
    .string()
    .min(10, 'phone number cannot be less than 10 characters')
    .max(13, { message: 'phone number cannot be more than 13 characters' })
    .optional(),
  work: z
    .string()
    .min(3, 'work cannot be less than 3 characters')
    .max(2200, { message: 'work cannot be more than 2200 characters' })
    .optional(),
  college: z
    .string()
    .min(3, 'college cannot be less than 3 characters')
    .max(2200, { message: 'college cannot be more than 2200 characters' })
    .optional(),
  school: z
    .string()
    .min(3, 'school cannot be less than 3 characters')
    .max(2200, { message: 'school cannot be more than 2200 characters' }),
  status: z
    .enum(['engaged', 'dating', 'married', 'single'], {
      message: 'marital status is required',
    })
    .optional(),
  location: z
    .string()
    .min(3, 'location cannot be less than 3 characters')
    .max(2200, { message: 'location cannot be more than 2200 characters' })
    .optional(),
});
