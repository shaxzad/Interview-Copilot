# @companyio/platform-database

MongoDB connection helper and shared product database naming conventions.

## Use

```ts
import { connectProductDatabase } from '@companyio/platform-database';

const { client, db } = await connectProductDatabase(
  { uri: process.env.MONGODB_URI!, databasePrefix: 'company' },
  'interview_copilot'
);

try {
  await db.collection('sessions').findOne({});
} finally {
  await client.close();
}
```

Supported products are `identity`, `school_erp`, `interview_copilot`, and `crm`.

## Build

```bash
pnpm --filter @companyio/platform-database build
```
