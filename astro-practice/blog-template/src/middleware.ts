import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get('token')?.value;
  const pathname = new URL(context.request.url).pathname;

  // Route/public file does not need auth
  const isPublicRoute =
    pathname === '/login' ||
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/assets') ||
    pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|webp|gif)$/);

  if (!token && !isPublicRoute) {
    return context.redirect('/login');
  }

  return next();
});
