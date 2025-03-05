import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';

import { OktaUserAdapter } from '../domain/adapters';
import type {
  AuthOktaToken,
  AuthOktaUser,
  UseAccessTokenSilentlyState,
  UserAccessTokenSilentlyOptions,
  UserToken,
} from '../domain/types';

export const useAccessTokenSilently = (
  options: UserAccessTokenSilentlyOptions,
): UseAccessTokenSilentlyState => {
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

  const handleGetAccessTokenSilently = useCallback(async () => {
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
  }, [getAccessTokenSilently, loginWithRedirect, options, toUserToken]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      handleGetAccessTokenSilently().then();
    }
  }, [handleGetAccessTokenSilently, isAuthenticated, isLoading]);

  return {
    error,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    userToken,
    handleGetAccessTokenSilently,
    user: toUser(user),
  };
};
