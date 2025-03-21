# Kurocado Studio Identity & Access Management

[Identity and Access Management](https://kurocado-studio.github.io/iam) is in the early stages of
development. We're sharing it publicly to gather feedback, collaborate with the community, and
improve it over time.

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
