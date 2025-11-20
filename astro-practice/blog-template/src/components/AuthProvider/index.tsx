import type { ReactNode } from 'react';
import { useCallback, useMemo } from 'react';

import { API_ROUTES, HTTP_METHOD, SHOW_HOME_SKELETON_FLAG } from '@/constants';
import { AuthContext } from '@/types';
import { clearSessionCookie, requestOptions } from '@/utils';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const logout = useCallback(async () => {
    try {
      await fetch(API_ROUTES.SESSION, {
        method: HTTP_METHOD.DELETE,
        ...requestOptions,
      });
    } finally {
      clearSessionCookie();
      // Clear the skeleton flag on logout
      try {
        globalThis.sessionStorage?.removeItem(SHOW_HOME_SKELETON_FLAG);
      } catch {
        // sessionStorage might not be available in some environments
      }
    }
  }, []);

  const value = useMemo(() => ({ logout }), [logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
