import { invalidateBlogCache } from '@/utils';

import type { APIRoute } from 'astro';

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const getBearerToken = (headerValue: string | null) => {
  if (!headerValue) return null;

  const [scheme, token] = headerValue.split(' ');
  return scheme?.toLowerCase() === 'bearer' ? (token?.trim() ?? null) : null;
};

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('Missing SANITY_WEBHOOK_SECRET for webhook verification.');
    return jsonResponse({ message: 'Server misconfigured' }, 500);
  }

  const token = getBearerToken(request.headers.get('authorization'));
  if (token !== secret) {
    return jsonResponse({ message: 'Unauthorized' }, 401);
  }

  try {
    await request.json();
  } catch {
    return jsonResponse({ message: 'Invalid JSON payload' }, 400);
  }

  invalidateBlogCache();

  return jsonResponse({ revalidated: true }, 200);
};

export const ALL: APIRoute = () =>
  jsonResponse({ message: 'Method not allowed' }, 405);
