# Kurocado Studio IAM SDK

The Auth0 React SDK is a lightweight library that enhances auth0-react by providing custom hooks for
authentication, Role-Based Access Control (RBAC), session management, and permissions handling. It
simplifies integrating Auth0 authentication in React applications by reducing boilerplate code and
enforcing best practices.

### Project Status
[Identity and Access Management](https://kurocado-studio.github.io/iam)
is in the early stages of development. We're sharing it publicly to gather feedback, collaborate
with the community, and improve it over time.

Feel free to open issues or contribute to discussions — your input is valuable!

## Installation

```bash
pnpm install @kurocado-studio/auth-zero
```

### Setup

Configure Environment Variables by creating a `.env` file with your Auth0 credentials:

```bash
VITE_AUTH_DOMAIN=**
VITE_AUTH_CLIENT_ID=**
VITE_AUTH_AUDIENCE=**
VITE_AUTH_SCOPE=**
VITE_AUTH_REDIRECT_URI=**
```

### Demo

There is an `app` directory containing a demo application

```bash
pnpm run demo-iam-app
```

### Usage

```typescript jsx
import { AuthSilentlyProvider, useAuthSilentlyContext } from '@kurocado-studio/auth-zero';
import React from 'react';

const YourComponent = () => {
  const { handleLogout } = useAuthSilentlyContext();
  return <button onCLick={() => handleLogout()}>Logout</button>
}

const Example: React.FC = () => {
  const domain = import.meta.env.VITE_AUTH_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI

  return <AuthSilentlyProvider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirectUri }}
  >
    {({ isAuthenticated }) => {
      if (isAuthenticated && !isLoading) {
        return <YourComponent />;
      }
      return null;
    }}
  </AuthSilentlyProvider>
}
```

## Documentation

- [Guides](https://kurocado.youtrack.cloud/articles/STY-A-4/Guides)
- [Project Charter](https://kurocado.youtrack.cloud/articles/STY-A-1/Project-Charter)

## Contributing

Contributions are always welcome! See
[contributing](https://kurocado.youtrack.cloud/articles/PLA-A-9/Contributing) for ways to get
started & please adhere to our
[code of conduct.](https://kurocado.youtrack.cloud/articles/PLA-A-10/Code-of-Conduct)
