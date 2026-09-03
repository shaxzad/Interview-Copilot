# @companyio/auth-react

React context for sharing an `AuthClient`, restoring sessions on startup, and reading the current user.

## Use

```tsx
import { AuthProvider, useAuth } from '@companyio/auth-react';

<AuthProvider client={authClient}>
  <App />
</AuthProvider>;

function Account() {
  const { user, isLoading, signOut } = useAuth();
  return isLoading ? <span>Loading...</span> : <button onClick={signOut}>{user?.email}</button>;
}
```

## Build

```bash
pnpm --filter @companyio/auth-react build
```
