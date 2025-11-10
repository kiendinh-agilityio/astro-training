import { defineMiddleware } from 'astro:middleware';

import {
  API_ROUTES,
  HTTP_METHOD,
  ROUTER,
  SESSION_COOKIE_NAME,
} from '@/constants';
import { isPublicRoute, parseSessionCookie } from '@/utils/session';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, method } = context.request;
  const pathname = new URL(url).pathname;
  const sessionCookie = context.cookies.get(SESSION_COOKIE_NAME)?.value;

  const isSessionManagement =
    pathname === API_ROUTES.SESSION &&
    [HTTP_METHOD.POST, HTTP_METHOD.DELETE].includes(method);
  const isPublic = isPublicRoute(pathname) || isSessionManagement;

  const session = parseSessionCookie(sessionCookie);

  if (session) {
    context.locals.session = {
      token: session.token,
      expiresAt: session.expiresAt,
    };
    context.locals.user = session.user;
  } else if (sessionCookie) {
    context.cookies.delete(SESSION_COOKIE_NAME, { path: ROUTER.HOME });
  }

  if (!session && !isPublic) return context.redirect(ROUTER.LOGIN);

  return next();
});
