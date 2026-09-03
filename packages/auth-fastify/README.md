# @companyio/auth-fastify

Fastify plugin for bearer-token authentication. Supply a `verifyAccessToken` function, then protect routes with `requireUser`.

## Use

```ts
import { authFastify, requireUser } from '@companyio/auth-fastify';

await app.register(authFastify, {
  verifyAccessToken: (token) => sessions.verify(token),
});

app.get('/private', { preHandler: requireUser }, async (request) => ({ user: request.user }));
```

Invalid or missing tokens return HTTP 401 responses.

## Build

```bash
pnpm --filter @companyio/auth-fastify build
```
