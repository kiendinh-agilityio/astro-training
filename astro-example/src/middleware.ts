import type { MiddlewareHandler } from 'astro';

// ============================================================================
// 1. LOGGING MIDDLEWARE
// ============================================================================
// Logs all requests with method, URL, and response time
export const loggingMiddleware: MiddlewareHandler = async (context, next) => {
  const start = Date.now();
  const { request, url } = context;

  console.log(
    `[${new Date().toISOString()}] ${request.method} ${url.pathname}`
  );

  const response = await next();

  const duration = Date.now() - start;
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${url.pathname} - ${
      response.status
    } (${duration}ms)`
  );

  return response;
};

// ============================================================================
// 2. AUTHENTICATION MIDDLEWARE
// ============================================================================
// Simple authentication check for protected routes
export const authMiddleware: MiddlewareHandler = async (context, next) => {
  const { url, request } = context;

  // Define protected routes
  const protectedRoutes = ['/admin', '/dashboard', '/profile'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check for authentication token in cookies or headers
    const authToken =
      request.headers.get('authorization') ||
      context.cookies.get('auth-token')?.value;

    if (!authToken || authToken !== 'valid-token-123') {
      return new Response('Unauthorized', {
        status: 401,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  }

  return next();
};

// ============================================================================
// 3. CORS MIDDLEWARE
// ============================================================================
// Handles Cross-Origin Resource Sharing
export const corsMiddleware: MiddlewareHandler = async (context, next) => {
  const { request } = context;

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const response = await next();

  // Add CORS headers to all responses
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  return response;
};

// ============================================================================
// 4. RATE LIMITING MIDDLEWARE
// ============================================================================
// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const rateLimitMiddleware: MiddlewareHandler = async (context, next) => {
  const { request, url } = context;

  // Only apply rate limiting to API routes
  if (!url.pathname.startsWith('/api/')) {
    return next();
  }

  const clientIP =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100; // Max 100 requests per window

  const key = `${clientIP}:${url.pathname}`;
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
  } else if (current.count >= maxRequests) {
    // Rate limit exceeded
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((current.resetTime - now) / 1000).toString(),
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(current.resetTime).toISOString(),
      },
    });
  } else {
    // Increment counter
    current.count++;
  }

  const response = await next();

  // Add rate limit headers
  const currentData = rateLimitStore.get(key);
  if (currentData) {
    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set(
      'X-RateLimit-Remaining',
      (maxRequests - currentData.count).toString()
    );
    response.headers.set(
      'X-RateLimit-Reset',
      new Date(currentData.resetTime).toISOString()
    );
  }

  return response;
};

// ============================================================================
// 5. SECURITY HEADERS MIDDLEWARE
// ============================================================================
// Adds security headers to all responses
export const securityHeadersMiddleware: MiddlewareHandler = async (
  context,
  next
) => {
  const response = await next();

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  );

  return response;
};

// ============================================================================
// 6. REQUEST ID MIDDLEWARE
// ============================================================================
// Adds a unique request ID to each request for tracking
export const requestIdMiddleware: MiddlewareHandler = async (context, next) => {
  const requestId = crypto.randomUUID();

  // Add request ID to context for use in pages/components
  context.locals.requestId = requestId;

  const response = await next();

  // Add request ID to response headers
  response.headers.set('X-Request-ID', requestId);

  return response;
};

// ============================================================================
// 7. MAINTENANCE MODE MIDDLEWARE
// ============================================================================
// Redirects all requests to maintenance page when enabled
export const maintenanceMiddleware: MiddlewareHandler = async (
  context,
  next
) => {
  const isMaintenanceMode = import.meta.env.MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode && !context.url.pathname.startsWith('/maintenance')) {
    return context.redirect('/maintenance');
  }

  return next();
};

// ============================================================================
// 8. GEO-LOCATION MIDDLEWARE
// ============================================================================
// Adds geo-location information to context based on IP
export const geoLocationMiddleware: MiddlewareHandler = async (
  context,
  next
) => {
  const { request } = context;

  // Get client IP
  const clientIP =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  // Simple geo-location (in production, use a proper geo-IP service)
  const geoData = {
    ip: clientIP,
    country: clientIP === '127.0.0.1' ? 'Local' : 'Unknown',
    city: clientIP === '127.0.0.1' ? 'Local' : 'Unknown',
    timezone: 'UTC',
  };

  // Add geo data to context
  context.locals.geo = geoData;

  return next();
};

// ============================================================================
// 9. CACHE CONTROL MIDDLEWARE
// ============================================================================
// Sets appropriate cache headers based on route
export const cacheControlMiddleware: MiddlewareHandler = async (
  context,
  next
) => {
  const { url } = context;

  const response = await next();

  // Set cache headers based on route type
  if (url.pathname.startsWith('/api/')) {
    // API routes - no cache
    response.headers.set(
      'Cache-Control',
      'no-cache, no-store, must-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  } else if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$/)
  ) {
    // Static assets - long cache
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  } else {
    // HTML pages - short cache
    response.headers.set('Cache-Control', 'public, max-age=300');
  }

  return response;
};

// ============================================================================
// 10. COMPOSED MIDDLEWARE
// ============================================================================
// Combines multiple middleware functions
export const composedMiddleware: MiddlewareHandler = async (context, next) => {
  // Apply middleware in order
  const middlewares = [
    requestIdMiddleware,
    loggingMiddleware,
    geoLocationMiddleware,
    maintenanceMiddleware,
    authMiddleware,
    rateLimitMiddleware,
    corsMiddleware,
    securityHeadersMiddleware,
    cacheControlMiddleware,
  ];

  // Create a chain of middleware
  const chain = middlewares.reduceRight((nextMiddleware, currentMiddleware) => {
    return async (ctx) => currentMiddleware(ctx, nextMiddleware);
  }, next);

  return chain(context);
};

// ============================================================================
// 11. CONDITIONAL MIDDLEWARE
// ============================================================================
// Applies middleware only under certain conditions
export const conditionalMiddleware = (
  condition: (context: any) => boolean,
  middleware: MiddlewareHandler
): MiddlewareHandler => {
  return async (context, next) => {
    if (condition(context)) {
      return middleware(context, next);
    }
    return next();
  };
};

// Example usage of conditional middleware
export const devOnlyLogging = conditionalMiddleware(
  (context) => import.meta.env.DEV,
  loggingMiddleware
);

export const apiOnlyRateLimit = conditionalMiddleware(
  (context) => context.url.pathname.startsWith('/api/'),
  rateLimitMiddleware
);

// ============================================================================
// 12. ERROR HANDLING MIDDLEWARE
// ============================================================================
// Catches and handles errors gracefully
export const errorHandlingMiddleware: MiddlewareHandler = async (
  context,
  next
) => {
  try {
    return await next();
  } catch (error) {
    console.error('Middleware error:', error);

    // Return appropriate error response
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          error: 'Internal Server Error',
          message: import.meta.env.DEV ? error.message : 'Something went wrong',
          requestId: context.locals.requestId,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response('Internal Server Error', { status: 500 });
  }
};

// ============================================================================
// EXPORT DEFAULT MIDDLEWARE
// ============================================================================
// This is the main middleware that will be used by Astro
export const onRequest: MiddlewareHandler = async (context, next) => {
  // Apply error handling first
  return errorHandlingMiddleware(context, async () => {
    // Then apply the composed middleware
    return composedMiddleware(context, next);
  });
};
