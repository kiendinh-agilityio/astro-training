import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, locals }) => {
  // Access middleware data
  const requestId = locals.requestId;
  const geoData = locals.geo;

  return new Response(
    JSON.stringify({
      message: 'Test API endpoint working!',
      timestamp: new Date().toISOString(),
      requestId,
      geoData,
      headers: {
        'user-agent': request.headers.get('user-agent'),
        accept: request.headers.get('accept'),
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const POST: APIRoute = async ({ request, locals }) => {
  const body = await request.json();

  return new Response(
    JSON.stringify({
      message: 'POST request received!',
      receivedData: body,
      requestId: locals.requestId,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
