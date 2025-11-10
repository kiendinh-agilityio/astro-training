import type { ReactNode } from 'react';
import { useCallback } from 'react';

import { API_ROUTES, HTTP_METHOD } from '@/constants';
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
    }
  }, []);

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
