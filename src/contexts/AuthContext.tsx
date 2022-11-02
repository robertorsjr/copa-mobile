import React, { createContext, ReactNode } from 'react';

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const user: UserProps = {
    name: 'Roberto',
    avatarUrl: 'https://github.com/robertorsjr.png',
  };

  async function signIn() {}
  return <AuthContext.Provider value={{ signIn, user }}>{children}</AuthContext.Provider>;
}
