import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

import { OktaUserAdapter } from '../domain/adapters';
import type {
  AuthOktaToken,
  AuthOktaUser,
  UseAccessTokenSilentlyResponse,
  UserAccessTokenSilentlyOptions,
  UserToken,
} from '../domain/types';

export const useAccessTokenSilently = (
  options: UserAccessTokenSilentlyOptions,
): UseAccessTokenSilentlyResponse => {
  const { toUser, toUserToken } = OktaUserAdapter.create();

  const {
    error,
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0<AuthOktaUser>();

  const [userToken, setUserToken] = useState<UserToken>(toUserToken());

  useEffect(() => {
    const fetchToken = async (): Promise<void> => {
      try {
        const payload: AuthOktaToken = await getAccessTokenSilently({
          ...options,
          detailedResponse: true,
        });

        const userToken = toUserToken(payload);
        setUserToken(userToken);
      } catch (e) {
        loginWithRedirect(options).then();
      }
    };

    if (!isAuthenticated && !isLoading) {
      fetchToken().then();
    }
  }, [
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    options,
    toUserToken,
  ]);

  return {
    error,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    userToken,
    user: toUser(user),
  };
};
