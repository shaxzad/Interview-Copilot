import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  main_business_id: z.string().min(1),
  branch_id: z.string().min(1),
  avatarUrl: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  slug: z.string().min(1),
  role: z.enum(['owner', 'admin', 'member']),
  main_business_id: z.string().min(1),
  branch_id: z.string().min(1),
});

export type Organization = z.infer<typeof OrganizationSchema>;

export const SessionSchema = z.object({
  accessToken: z.string().min(1),
  expiresAt: z.number().int().positive(),
  user: UserSchema,
});

export type AuthSession = z.infer<typeof SessionSchema>;

export type AuthErrorCode =
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'INVALID_REQUEST'
  | 'NETWORK_ERROR'
  | 'UNKNOWN';

export type AuthError = {
  code: AuthErrorCode;
  message: string;
  status?: number;
};

export const SignUpSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  businessName: z.string().min(1).max(120),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type SignInInput = z.infer<typeof SignInSchema>;

export type AuthClientConfig = {
  baseUrl: string;
  clientId: string;
  storage?: TokenStorage;
  fetch?: typeof fetch;
};

export interface TokenStorage {
  get(): Promise<string | null>;
  set(token: string): Promise<void>;
  clear(): Promise<void>;
}

export type AuthApi = {
  session: AuthSession;
  user: User;
  organizations: Organization[];
};

export const CreateInvitationSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'member']).default('member'),
});

export type CreateInvitation = z.infer<typeof CreateInvitationSchema>;
