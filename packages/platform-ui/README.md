# @companyio/platform-ui

Shared React UI components, layouts, auth forms, charts, icons, and styling used by the web, admin, and desktop applications.

## Auth forms

`SignInForm` and `SignUpForm` accept an `AuthClient` and submit directly to the shared authentication API:

```tsx
import { SignInForm } from '@companyio/platform-ui';

<SignInForm client={authClient} />;
```

The package also exports `AppLayout`, `ThemeProvider`, form controls, dashboards, tables, charts, and generated icons.

## Build

```bash
pnpm --filter @companyio/platform-ui build
```

The build regenerates icon components before running TypeScript.
