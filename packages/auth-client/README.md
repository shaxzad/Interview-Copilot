# @companyio/auth-client

Platform-neutral client for password sign-in, signup, session restoration, logout, current-user requests, and organization lookup.

## Setup

```ts
import { AuthClient, createBrowserStorage } from '@companyio/auth-client';

const authClient = new AuthClient({
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  clientId: 'my-app',
  storage: createBrowserStorage(),
});
```

Use `createMemoryStorage()` for tests or short-lived sessions. The client expects the API under `/api/v1` and sends bearer tokens automatically.

## Build

```bash
pnpm --filter @companyio/auth-client build
```
