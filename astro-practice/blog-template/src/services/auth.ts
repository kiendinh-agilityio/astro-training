import { AUTH_API_URL, MESSAGE_AUTH_ERRORS } from '@/constants';
import type { LoginResult } from '@/types';

export const loginAuth = async (
  email: string,
  password: string,
): Promise<LoginResult> => {
  const url = `${AUTH_API_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const users = await res.json();

    const match = Array.isArray(users)
      ? users.find((user) => user.email === email && user.password === password)
      : null;

    return match
      ? { ok: true, user: match, token: `${match.id}-mock-token` }
      : { ok: false, error: MESSAGE_AUTH_ERRORS.INVALID_CREDENTIALS };
  } catch {
    return { ok: false, error: MESSAGE_AUTH_ERRORS.SYSTEM_ERROR };
  }
};

export const logout = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('token');
  document.cookie = 'token=; Max-Age=0; path=/; samesite=lax';
};
