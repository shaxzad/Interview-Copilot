# @companyio/auth-contracts

Shared Zod validation schemas and TypeScript types for authentication, users, sessions, organizations, and invitations.

Exports include `SignInSchema`, `SignUpSchema`, `SessionSchema`, `UserSchema`, `OrganizationSchema`, and their inferred types.

## Use

```ts
import { SignInSchema } from '@companyio/auth-contracts';

const credentials = SignInSchema.parse({ email, password });
```

## Build

```bash
pnpm --filter @companyio/auth-contracts build
```
