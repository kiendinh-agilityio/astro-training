import { PUBLIC_EXTENSIONS, PUBLIC_PATHS, PUBLIC_PREFIXES } from '@/constants';

export const isPublicRoute = (pathname: string): boolean =>
  PUBLIC_PATHS.includes(pathname) ||
  PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
  PUBLIC_EXTENSIONS.test(pathname);

export const parseSessionCookie = (
  cookieValue?: string,
): App.CookiePayload | null => {
  if (!cookieValue) return null;

  try {
    const parsed = JSON.parse(cookieValue) as App.CookiePayload;
    if (parsed.token && parsed.expiresAt > Date.now()) {
      return parsed;
    }
  } catch (error) {
    console.warn('Failed to parse session cookie:', error);
  }

  return null;
};
