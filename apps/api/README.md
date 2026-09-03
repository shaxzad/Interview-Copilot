# CompanyIO API

Fastify API providing MongoDB-backed authentication and organization endpoints.

## Run

```bash
pnpm --filter @companyio/api dev
```

Configure `MONGODB_URI`, `MONGODB_DATABASE`, `API_HOST`, and `API_PORT` in the root `.env` file. The API exposes password signup/sign-in, session restoration, logout, current-user, and organization endpoints under `/api/v1`.
