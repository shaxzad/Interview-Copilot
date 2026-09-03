import { PageMeta, SignInForm } from '@companyio/platform-ui';
import { useAuth } from '@companyio/auth-react';
import AuthLayout from './AuthPageLayout';

export default function SignIn() {
  const { client } = useAuth();
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm client={client} />
      </AuthLayout>
    </>
  );
}
