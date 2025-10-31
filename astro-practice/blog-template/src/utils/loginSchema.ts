import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(9, 'Password must be more than 8 characters'),
});
