# CompanyIO Desktop

Tauri and React desktop application with API-backed sign-in/sign-up and protected workspace access.

## Run

```bash
pnpm --filter @companyio/desktop dev
```

Set `VITE_API_URL` to the API origin when it is not `http://localhost:3000`. The desktop app requires authentication before opening the interview workspace.
