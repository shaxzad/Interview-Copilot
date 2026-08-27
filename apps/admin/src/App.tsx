import { AppShell, AuthForm, ProductGrid, ProductTile } from '@companyio/platform-ui';
import { useAuth } from '@companyio/auth-react';

const PRODUCT_TILES: ProductTile[] = [
  {
    id: 'practice',
    index: '01',
    title: 'Interview practice',
    description: 'Run focused technical, behavioral, coding, and system-design sessions.',
    actionLabel: 'Open workspace',
    actionIcon: <span>↗</span>,
    href: '#sessions',
    featured: true,
  },
  {
    id: 'history',
    index: '02',
    title: 'Session history',
    description: 'Review answers, feedback, and the areas that will move you forward.',
    actionLabel: 'View history',
    actionIcon: <span>↗</span>,
    href: '#history',
  },
  {
    id: 'insights',
    index: '03',
    title: 'Personal insights',
    description: 'See your recurring strengths and choose what to practice next.',
    actionLabel: 'Coming soon',
  },
];

const App = () => {
  const { client, user, isLoading, signOut } = useAuth();

  if (isLoading) return <div className="web-loading">Loading workspace...</div>;

  if (!user) {
    return (
      <main className="landing-page">
        <section className="auth-surface">
          <p className="surface-kicker">INTERVIEW COPILOT</p>
          <h2>Your practice workspace</h2>
          <p>Sign in to continue, or create an account to start your first session.</p>
          <AuthForm client={client} />
        </section>
      </main>
    );
  }

  return (
    <AppShell
      productName="Interview Copilot"
      navigation={
        <>
          <a href="#overview">Overview</a>
          <a href="#sessions">Sessions</a>
          <a href="#insights">Insights</a>
        </>
      }
      actions={
        <button className="sign-out" onClick={() => void signOut()}>
          Sign out
        </button>
      }
    >
      <section className="workspace-hero" id="overview">
        <p className="web-kicker">YOUR WORKSPACE</p>
        <h1>Good to see you, {user.name?.split(' ')[0] ?? 'there'}.</h1>
        <p>Choose a product workflow and keep your progress synced across devices.</p>
      </section>
      <ProductGrid id="sessions" items={PRODUCT_TILES} />
      <div className="sync-note">
        <span /> Synced through the shared Interview Copilot API
      </div>
    </AppShell>
  );
};

export default App;
