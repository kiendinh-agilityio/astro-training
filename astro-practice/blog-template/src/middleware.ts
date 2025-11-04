import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get('token')?.value;
  const pathname = new URL(context.request.url).pathname;

  const PUBLIC_PATHS = ['/login', '/robots.txt'];

  const PUBLIC_PREFIXES = [
    '/sitemap',
    '/_astro',
    '/favicon',
    '/public',
    '/assets',
  ];

  const PUBLIC_EXTENSIONS = /\.(css|js|png|jpg|jpeg|svg|ico|webp|gif|xml)$/;

  const isPublicRoute =
    PUBLIC_PATHS.includes(pathname) ||
    PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    PUBLIC_EXTENSIONS.test(pathname);

  if (!token && !isPublicRoute) {
    return context.redirect('/login');
  }

  return next();
});
