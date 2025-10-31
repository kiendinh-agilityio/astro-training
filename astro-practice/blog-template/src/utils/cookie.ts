export const setCookie = (
  name: string,
  value: string,
  maxAgeSeconds = 60 * 60 * 24 * 7,
) =>
  (document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`);
