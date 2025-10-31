import { z } from 'zod';

import { loginSchema } from '@/utils';

export type LoginFields = z.infer<typeof loginSchema>;

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface LoginResult {
  ok: boolean;
  token?: string;
  user?: User;
  error?: string;
}
