import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { AuthClient } from '@companyio/auth-client';
import { AuthSession, User } from '@companyio/auth-contracts';

type AuthContextValue = {
  client: AuthClient;
  session: AuthSession | null;
  user: User | null;
  isLoading: boolean;
  signIn: (provider?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ client, children }: PropsWithChildren<{ client: AuthClient }>) => {
  const [session, setSession] = useState<AuthSession | null>(client.session);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = client.subscribe(setSession);
    void client.restore().finally(() => setIsLoading(false));
    return unsubscribe;
  }, [client]);

  const value: AuthContextValue = {
    client,
    session,
    user: session?.user ?? null,
    isLoading,
    signIn: (provider) => client.signIn(provider),
    signOut: () => client.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside an AuthProvider.');
  return context;
};
