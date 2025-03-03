import { faker } from '@faker-js/faker';
import { ReactTestingLibrary } from '@kurocado-studio/qa';
import * as React from 'react';
import { vi } from 'vitest';

import { AuthAccessSilentlyProvider, type AuthProviderProps } from '../../src';

const { screen, render } = ReactTestingLibrary;

function TestAuthAccessSilentlyProvider(
  props: AuthProviderProps,
): React.ReactNode {
  return (
    <AuthAccessSilentlyProvider {...props}>
      {({ isLoading }) =>
        isLoading ? <h1>Loading...</h1> : <h1>Hello User!</h1>
      }
    </AuthAccessSilentlyProvider>
  );
}

describe('AuthAccessSilentlyProvider', () => {
  let auth0ProviderParams: AuthProviderProps;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    auth0ProviderParams = {
      clientId: faker.string.uuid(),
      domain: faker.string.uuid(),
      authorizationParams: {
        redirect_uri: faker.internet.domainName(),
      },
      children: ({ isLoading }) => {
        return isLoading ? <h1>Loading...</h1> : <h1>Hello User!</h1>;
      },
    };
  });

  it('lets the user know the provider is trying to login the user', () => {
    render(<TestAuthAccessSilentlyProvider {...auth0ProviderParams} />);
    expect(screen.getByText(/Loading.../i)).toBeDefined();
  });
});
