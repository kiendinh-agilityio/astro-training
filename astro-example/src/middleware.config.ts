/**
 * Middleware Configuration
 *
 * This file demonstrates different ways to configure and use middleware in Astro.
 * You can use this as a reference for setting up your own middleware.
 */

import type { MiddlewareHandler } from 'astro';

// ============================================================================
// SIMPLE MIDDLEWARE CONFIGURATION
// ============================================================================

// Basic middleware that just logs requests
export const simpleLogging: MiddlewareHandler = async (context, next) => {
  console.log(
    `[${new Date().toISOString()}] ${context.request.method} ${
      context.url.pathname
    }`
  );
  return next();
};

// ============================================================================
// DEVELOPMENT-ONLY MIDDLEWARE
// ============================================================================

// Only runs in development mode
export const devMiddleware: MiddlewareHandler = async (context, next) => {
  if (import.meta.env.DEV) {
    console.log('🔧 Development mode middleware active');
    console.log('Request details:', {
      method: context.request.method,
      url: context.url.pathname,
      userAgent: context.request.headers.get('user-agent'),
    });
  }
  return next();
};

// ============================================================================
// PRODUCTION-ONLY MIDDLEWARE
// ============================================================================

// Only runs in production mode
export const prodMiddleware: MiddlewareHandler = async (context, next) => {
  if (import.meta.env.PROD) {
    // Add production-specific headers
    const response = await next();
    response.headers.set('X-Powered-By', 'Astro');
    response.headers.set('X-Environment', 'production');
    return response;
  }
  return next();
};

// ============================================================================
// ROUTE-SPECIFIC MIDDLEWARE
// ============================================================================

// Only applies to specific routes
export const apiMiddleware: MiddlewareHandler = async (context, next) => {
  if (context.url.pathname.startsWith('/api/')) {
    console.log('API request detected:', context.url.pathname);

    // Add API-specific headers
    const response = await next();
    response.headers.set('X-API-Version', '1.0');
    return response;
  }
  return next();
};

// ============================================================================
// CONDITIONAL MIDDLEWARE HELPER
// ============================================================================

export function createConditionalMiddleware(
  condition: (context: any) => boolean,
  middleware: MiddlewareHandler
): MiddlewareHandler {
  return async (context, next) => {
    if (condition(context)) {
      return middleware(context, next);
    }
    return next();
  };
}

// ============================================================================
// MIDDLEWARE COMPOSITION EXAMPLES
// ============================================================================

// Compose multiple middleware functions
export function composeMiddleware(
  ...middlewares: MiddlewareHandler[]
): MiddlewareHandler {
  return middlewares.reduceRight(
    (nextMiddleware, currentMiddleware) => {
      return async (context, next) =>
        currentMiddleware(context, nextMiddleware);
    },
    async (context, next) => next()
  );
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Simple composition
export const basicComposition = composeMiddleware(
  simpleLogging,
  devMiddleware,
  apiMiddleware
);

// Example 2: Conditional middleware
export const conditionalApiLogging = createConditionalMiddleware(
  (context) => context.url.pathname.startsWith('/api/'),
  simpleLogging
);

// Example 3: Environment-specific composition
export const environmentSpecific = composeMiddleware(
  import.meta.env.DEV ? devMiddleware : prodMiddleware,
  apiMiddleware
);

// ============================================================================
// EXPORT FOR USE IN MAIN MIDDLEWARE
// ============================================================================

// This is the main middleware that will be used
export const onRequest: MiddlewareHandler = composeMiddleware(
  simpleLogging,
  devMiddleware,
  apiMiddleware
);
