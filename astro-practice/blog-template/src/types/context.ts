import { createContext } from 'react';

interface AuthContextValue {
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
