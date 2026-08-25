import { FormEvent, useState } from 'react';
import { AuthClient } from '@company/auth-client';

export const AuthForm = ({ client, onSuccess }: { client: AuthClient; onSuccess?: () => void }) => {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'sign-up') await client.signUp({ name, email, password, businessName });
      else await client.signInWithPassword({ email, password });
      onSuccess?.();
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : typeof caught === 'object' && caught !== null && 'message' in caught
            ? String(caught.message)
            : 'Unable to authenticate.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="platform-auth-form" onSubmit={submit}>
      <div className="platform-auth-tabs">
        <button
          type="button"
          className={mode === 'sign-in' ? 'active' : ''}
          onClick={() => setMode('sign-in')}
        >
          Sign in
        </button>
        <button
          type="button"
          className={mode === 'sign-up' ? 'active' : ''}
          onClick={() => setMode('sign-up')}
        >
          Create account
        </button>
      </div>
      {mode === 'sign-up' && (
        <>
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label>
            Business name
            <input
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              required
            />
          </label>
        </>
      )}
      <label>
        Work email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      {error && <div className="platform-auth-error">{error}</div>}
      <button className="platform-auth-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? 'Connecting...'
          : mode === 'sign-in'
            ? 'Continue to workspace'
            : 'Create workspace'}
      </button>
    </form>
  );
};
