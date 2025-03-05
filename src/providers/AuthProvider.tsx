import { Auth0Provider, type LogoutOptions } from '@auth0/auth0-react';
import * as React from 'react';

import { OrgUser, OrgUserToken } from '../domain/models';
import type {
  User,
  UserAccessTokenSilentlyOptions,
  UserToken,
} from '../domain/types';
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
  userToken: UserToken;
  logOut: (options?: LogoutOptions) => Promise<void>;
  user: User;
}

const AuthAccessSilentlyContext = React.createContext<AuthSilentlyContext>({
  isAuthenticated: false,
  isLoading: true,
  userToken: OrgUserToken.create({}),
  logOut: () => Promise.resolve(),
  user: OrgUser.create(),
});

function AuthAccessSilently({
  children,
  ...restAuthProviderOpts
}: AuthProviderProps): React.ReactNode {
  const { isLoading, isAuthenticated, logout, user, userToken } =
    useAccessTokenSilently(restAuthProviderOpts);

  const authAccess: AuthSilentlyContext = {
    isAuthenticated,
    userToken,
    isLoading,
    user,
    logOut: logout,
  };

  return (
    <AuthAccessSilentlyContext.Provider value={authAccess}>
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

export const useAuthSilentlyContext = (): AuthSilentlyContext =>
  React.useContext(AuthAccessSilentlyContext);
