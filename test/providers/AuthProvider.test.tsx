import { ReactTestingLibrary } from '@kurocado-studio/qa';
import * as React from 'react';

import { AuthAccessSilentlyProvider } from '../../src';

const { screen, render } = ReactTestingLibrary;

describe('AuthProvider', () => {
  let container: HTMLElement;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    container = document.createElement('div');
    const auth0ProviderParams = {
      clientId: '',
      domain: '',
      authorizationParams: {
        redirect_uri: '',
        prompt: 'login',
      },
    };

    render(
      <AuthAccessSilentlyProvider {...auth0ProviderParams}>
        <h1>Hello, World!</h1>
      </AuthAccessSilentlyProvider>,
    );
  });

  it('renders the component into the DOM with correct props', () => {
    // vi.spyOn(OktaSdk, 'useAuth0').mockImplementationOnce(() => {
    //   return {
    //     error: undefined,
    //     isAuthenticated: true,
    //     isLoading: false,
    //     getAccessTokenSilently: vi.fn(),
    //     loginWithRedirect: vi.fn(),
    //     getAccessTokenWithPopup: vi.fn(),
    //     getIdTokenClaims: vi.fn(),
    //     loginWithPopup: vi.fn(),
    //     logout: vi.fn(),
    //     handleRedirectCallback: vi.fn(),
    //   };
    // });

    expect(container.querySelector('h1')?.textContent).toBe('Hello, World!');
  });

  it('renders the component into the DOM with correct props', () => {
    screen.debug();
    expect(container.querySelector('h1')?.textContent).toBe('Hello, World!');
  });
});
