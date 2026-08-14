import { z } from 'zod';

// Question generation schema
export const QuestionGenerationSchema = z.object({
  category: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  count: z.number().min(1).max(10),
  topic: z.string().optional(),
});

export type QuestionGeneration = z.infer<typeof QuestionGenerationSchema>;

// Answer evaluation schema
export const AnswerEvaluationSchema = z.object({
  questionId: z.string(),
  answer: z.string().min(1),
  rubric: z.enum(['technical', 'communication', 'problem-solving']).optional(),
});

export type AnswerEvaluation = z.infer<typeof AnswerEvaluationSchema>;

// Feedback schema
export const FeedbackSchema = z.object({
  score: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  detailedFeedback: z.string(),
  suggestedTopics: z.array(z.string()).optional(),
});

export type Feedback = z.infer<typeof FeedbackSchema>;

// Interview analysis schema
export const InterviewAnalysisSchema = z.object({
  totalScore: z.number().min(0).max(100),
  categoryScores: z.record(z.string(), z.number()),
  transcript: z.array(z.object({
    questionId: z.string(),
    answer: z.string(),
    feedback: FeedbackSchema,
  })),
  overallFeedback: z.string(),
  areasForImprovement: z.array(z.string()),
});

export type InterviewAnalysis = z.infer<typeof InterviewAnalysisSchema>;
