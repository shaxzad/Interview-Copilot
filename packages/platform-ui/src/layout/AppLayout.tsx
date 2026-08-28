import { Outlet } from 'react-router-dom';

import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import Backdrop from './Backdrop';
import type { SidebarConfig } from './types';

type AppLayoutProps = {
  config: SidebarConfig;
};

const LayoutContent: React.FC<AppLayoutProps> = ({ config }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar config={config} />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
        } ${isMobileOpen ? 'ml-0' : ''}`}
      >
        <AppHeader />

        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC<AppLayoutProps> = ({ config }) => {
  return (
    <SidebarProvider>
      <LayoutContent config={config} />
    </SidebarProvider>
  );
};

export default AppLayout;
