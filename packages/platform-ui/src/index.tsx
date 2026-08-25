import { PropsWithChildren, ReactNode } from 'react';

export type AppShellProps = PropsWithChildren<{
  productName: string;
  navigation?: ReactNode;
  actions?: ReactNode;
  sidebar?: ReactNode;
}>;

export const AppShell = ({
  productName,
  navigation,
  actions,
  sidebar,
  children,
}: AppShellProps) => (
  <div className="platform-shell">
    <header className="platform-header">
      <a className="platform-brand" href="/" aria-label={`${productName} home`}>
        {productName}
      </a>
      <nav aria-label="Primary navigation">{navigation}</nav>
      <div className="platform-actions">{actions}</div>
    </header>
    <div className="platform-body">
      {sidebar && <aside className="platform-sidebar">{sidebar}</aside>}
      <main className="platform-content">{children}</main>
    </div>
  </div>
);

export { AuthForm } from './AuthForm';
export { ProductGrid } from './ProductGrid';
export type { ProductTile } from './ProductGrid';
