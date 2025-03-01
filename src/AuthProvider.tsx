import { Auth0Provider, type Auth0ProviderOptions } from '@auth0/auth0-react';
import * as React from 'react';

export function AuthProvider({
  children,
  ...restAuthProviderProps
}: Auth0ProviderOptions): React.ReactNode {
  return <Auth0Provider {...restAuthProviderProps}>{children}</Auth0Provider>;
}
