# Contributing

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Create `.env` file from `.env.example`
4. Run development server: `pnpm dev`

## Code Style

- TypeScript for type safety
- ESLint for linting
- Prettier for formatting
- 2-space indentation

## Testing

All new features should include tests. Run tests with:

```bash
pnpm test
```

## Git Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## PR Guidelines

- Clear description of changes
- Reference related issues
- Include tests for new features
- Ensure all tests pass
- Update documentation as needed
