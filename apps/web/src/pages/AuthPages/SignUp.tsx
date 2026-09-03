import { PageMeta, SignUpForm } from '@companyio/platform-ui';
import { useAuth } from '@companyio/auth-react';
import AuthLayout from './AuthPageLayout';

export default function SignUp() {
  const { client } = useAuth();
  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignUpForm client={client} />
      </AuthLayout>
    </>
  );
}
