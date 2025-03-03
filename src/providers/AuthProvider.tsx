import { Auth0Provider } from '@auth0/auth0-react';
import * as React from 'react';

import { OrgUser } from '../domain/models';
import type { User, UserAccessTokenSilentlyOptions } from '../domain/types';
import { useAccessTokenSilently } from '../hooks/useAccessTokenSilently';

export interface AuthProviderProps extends UserAccessTokenSilentlyOptions {
  children: React.FC<{
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User;
  }>;
  loaderComponent?: React.ReactNode;
  onRedirectComponent?: React.ReactNode;
}

export interface AuthSilentlyContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
}

export const AuthAccessSilentlyContext =
  React.createContext<AuthSilentlyContext>({
    isAuthenticated: false,
    isLoading: true,
    user: OrgUser.create(),
  });

export function AuthAccessSilently({
  children,
  ...restAuthProviderOpts
}: AuthProviderProps): React.ReactNode {
  const { isLoading, isAuthenticated, logout, user } =
    useAccessTokenSilently(restAuthProviderOpts);

  const authAccess: AuthSilentlyContext = {
    isAuthenticated,
    isLoading,
    user,
  };

  return (
    <AuthAccessSilentlyContext.Provider value={authAccess}>
      <button
        type='button'
        onClick={(): Promise<void> => {
          return logout({
            logoutParams: { returnTo: window.location.origin },
          });
        }}
      >
        Log Out
      </button>
      {children({ isLoading, isAuthenticated, user })}
    </AuthAccessSilentlyContext.Provider>
  );
}

export function AuthAccessSilentlyProvider({
  children,
  ...restAuthProviderOpts
}: AuthProviderProps): React.ReactNode {
  return (
    <Auth0Provider {...restAuthProviderOpts}>
      <AuthAccessSilently {...restAuthProviderOpts}>
        {children}
      </AuthAccessSilently>
    </Auth0Provider>
  );
}
