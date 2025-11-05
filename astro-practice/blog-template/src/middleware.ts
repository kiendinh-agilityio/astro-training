import { defineMiddleware } from 'astro:middleware';

import {
  PUBLIC_EXTENSIONS,
  PUBLIC_PATHS,
  PUBLIC_PREFIXES,
  ROUTER,
} from '@/constants';

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get('token')?.value;
  const pathname = new URL(context.request.url).pathname;

  const isPublicRoute =
    PUBLIC_PATHS.includes(pathname) ||
    PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    PUBLIC_EXTENSIONS.test(pathname);

  if (!token && !isPublicRoute) {
    return context.redirect(ROUTER.LOGIN);
  }

  return next();
});
