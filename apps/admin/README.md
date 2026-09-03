# CompanyIO Admin

Administrative React application with persistent authentication and protected dashboard routes.

## Run

```bash
pnpm --filter @companyio/admin dev
```

Set `VITE_API_URL` to the API origin when it is not `http://localhost:3000`. Authentication uses the shared API and auth packages.
