import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '@/constants';
import type { User } from '@/types';

import type { APIRoute } from 'astro';

const SESSION_COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: import.meta.env.PROD,
  maxAge: SESSION_MAX_AGE_SECONDS,
};

const jsonResponse = (data: unknown, status: number) =>
  new Response(JSON.stringify(data), { status });

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const { token, user } = (await request.json()) as {
      token?: string;
      user?: User;
    };

    if (!(token && user?.id))
      return jsonResponse({ message: 'Missing session data' }, 400);

    const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;

    locals.session = { token, expiresAt };
    locals.user = user;

    cookies.set(
      SESSION_COOKIE_NAME,
      JSON.stringify({ token, expiresAt, user }),
      SESSION_COOKIE_OPTIONS,
    );

    return new Response(null, { status: 204 });
  } catch (err) {
    return jsonResponse(
      { message: err instanceof Error ? err.message : 'Invalid payload' },
      400,
    );
  }
};

export const DELETE: APIRoute = async ({ cookies, locals }) => {
  cookies.delete(SESSION_COOKIE_NAME, { path: SESSION_COOKIE_OPTIONS.path });
  locals.session = undefined;
  locals.user = undefined;

  return new Response(null, { status: 204 });
};
