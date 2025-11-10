import { SESSION_COOKIE_NAME } from '@/constants';

export const clearSessionCookie = (): void => {
  if (typeof document === 'undefined') return;

  document.cookie = `${SESSION_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
};

export const requestOptions = {
  credentials: 'include' as const,
  headers: { 'Content-Type': 'application/json' },
};
