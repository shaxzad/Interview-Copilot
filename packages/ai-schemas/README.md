# @companyio/ai-schemas

Zod schemas and inferred types for AI-powered interview features.

Exports include `QuestionGenerationSchema`, `AnswerEvaluationSchema`, `FeedbackSchema`, and `InterviewAnalysisSchema`.

## Use

```ts
import { QuestionGenerationSchema } from '@companyio/ai-schemas';

const input = QuestionGenerationSchema.parse({
  category: 'frontend',
  difficulty: 'medium',
  count: 5,
});
```

## Build

```bash
pnpm --filter @companyio/ai-schemas build
```
