# @companyio/platform-tenancy

Fastify tenant context and scope enforcement for users assigned to a business and branch.

## Use

```ts
import { authFastify } from '@companyio/auth-fastify';
import { requireTenant, tenancyFastify } from '@companyio/platform-tenancy';

await app.register(authFastify, { verifyAccessToken });
await app.register(tenancyFastify, { authenticate: (request) => request.authenticate() });

app.get(
  '/tenant-data',
  {
    preHandler: async (request) => {
      await request.requireTenant();
    },
  },
  async (request) => ({ scope: requireTenant(request) })
);
```

The plugin validates optional `x-main-business-id` and `x-branch-id` headers against the authenticated user.

## Build

```bash
pnpm --filter @companyio/platform-tenancy build
```
