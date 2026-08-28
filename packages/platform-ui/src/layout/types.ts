import type { ReactNode } from 'react';

export type SidebarSubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
};

export type SidebarNavItem = {
  name: string;
  icon: ReactNode;
  path?: string;
  subItems?: SidebarSubItem[];
};

export type SidebarProjectDetails = {
  /**
   * Project/application name.
   *
   * Used when the application wants to display
   * a text-based brand instead of an image logo.
   */
  name?: string;

  /**
   * Regular logo.
   */
  logo?: string;

  /**
   * Dark-mode logo.
   */
  darkLogo?: string;

  /**
   * Logo displayed when the sidebar is collapsed.
   */
  collapsedLogo?: string;

  /**
   * Logo dimensions.
   */
  logoWidth?: number;
  logoHeight?: number;

  /**
   * Optional URL for the logo.
   *
   * Defaults to "/".
   */
  href?: string;
};

export type SidebarConfig = {
  projectDetails?: SidebarProjectDetails;

  navItems: SidebarNavItem[];

  othersItems: SidebarNavItem[];
};
