import { describe, expect, it } from 'vitest';
import { SignInSchema, SignUpSchema } from './index';

describe('authentication contracts', () => {
  it('accepts valid sign-in credentials', () => {
    expect(SignInSchema.parse({ email: 'person@example.com', password: 'password' })).toEqual({
      email: 'person@example.com',
      password: 'password',
    });
  });

  it('requires a business name and an eight-character password for signup', () => {
    expect(() =>
      SignUpSchema.parse({
        name: 'Person',
        email: 'person@example.com',
        password: 'short',
        businessName: 'Business',
      })
    ).toThrow();
    expect(() =>
      SignUpSchema.parse({ name: 'Person', email: 'person@example.com', password: 'password123' })
    ).toThrow();
  });
});
