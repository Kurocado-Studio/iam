import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useMemo, useState } from 'react';

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
  const { toUser, toUserToken } = new OktaUserAdapter();

  const { error, isLoading, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0<AuthOktaUser>();

  const [userToken, setUserToken] = useState<UserToken>(toUserToken());

  useEffect(() => {
    const fetchToken = async (): Promise<void> => {
      const payload: AuthOktaToken = await getAccessTokenSilently({
        ...options,
        detailedResponse: true,
      });

      setUserToken(toUserToken(payload));
    };

    fetchToken().then();

    return () => setUserToken(toUserToken());
  }, [getAccessTokenSilently, options, setUserToken, toUserToken]);

  return useMemo(() => {
    return {
      error,
      isLoading,
      isAuthenticated,
      userToken,
      user: toUser(user),
    };
  }, [error, isAuthenticated, isLoading, toUser, user, userToken]);
};
