import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    const missing = requiredFields.filter((f) => !body[f]);
    if (missing.length) {
      return new Response(
        JSON.stringify({ error: `Missing fields: ${missing.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check API token
    const apiToken = import.meta.env.PIPEDRIVE_API_KEY as string;
    if (!apiToken) {
      return new Response(
        JSON.stringify({ error: 'Missing PIPEDRIVE_API_KEY in environment' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const baseUrl = import.meta.env.PIPEDRIVE_BASE_URL as string;

    // 1) Create Person
    const personRes = await fetch(
      `${baseUrl}/api/v1/persons?api_token=${apiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${body.firstName} ${body.lastName}`,
          email: body.email,
          phone: body.phone,
        }),
      }
    );

    if (!personRes.ok) {
      return new Response(
        JSON.stringify({
          error: 'Failed to create person',
          details: await personRes.text(),
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const personData = await personRes.json();

    // 2) Create Lead (use form title when provided)
    const leadRes = await fetch(
      `${baseUrl}/api/v1/leads?api_token=${apiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: body.title,
          person_id: personData.data.id,
        }),
      }
    );

    if (!leadRes.ok) {
      return new Response(
        JSON.stringify({
          error: 'Failed to create lead',
          details: await leadRes.text(),
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const leadData = await leadRes.json();

    // 3) Create Note for the lead (mirror Web Form submission summary)
    const noteLines = [
      'Web Form submission summary',
      '',
      `First Name\n${body.firstName || ''}`,
      '',
      `Last Name\n${body.lastName || ''}`,
      '',
      `Title\n${body.title || ''}`,
      '',
      `Business Email\n${body.email || ''}`,
      '',
      `Phone Number\n${body.phone || ''}`,
      '',
      `Municipality/Company\n${body.company || ''}`,
      '',
      `Zip\n${body.zip || ''}`,
      '',
      `Message\n${body.message || '(Blank)'}`,
    ];
    const noteContent = noteLines.join('\n');
    const noteRes = await fetch(
      `${baseUrl}/api/v1/notes?api_token=${apiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: noteContent,
          lead_id: leadData.data.id,
        }),
      }
    );

    if (!noteRes.ok) {
      await noteRes.text();
    }

    return new Response(
      JSON.stringify({
        success: true,
        personId: personData.data.id,
        leadId: leadData.data.id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: err instanceof Error ? err.message : String(err),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
