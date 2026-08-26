# Changesets

Add a changeset when a published `@companyio/*` package changes:

```bash
pnpm changeset
```

Choose the affected packages and a semver level:

- `patch`: bug fix or backwards-compatible change
- `minor`: backwards-compatible feature
- `major`: breaking change

The release workflow opens a version PR. Merging that PR into `main` publishes the changed packages to npm.
