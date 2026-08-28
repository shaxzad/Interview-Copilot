import type { SidebarConfig } from '@companyio/platform-ui';

import { CalenderIcon, GridIcon, UserCircleIcon } from '@companyio/platform-ui';

export const sidebarConfig: SidebarConfig = {
  projectDetails: {
    name: 'Company Web',
    logo: '',
    darkLogo: '',
    collapsedLogo: '/images/logo/logo-icon.svg',
    logoWidth: 150,
    logoHeight: 40,
  },
  navItems: [
    {
      icon: <GridIcon />,
      name: 'Dashboard',
      subItems: [
        {
          name: 'Home',
          path: '/',
        },
      ],
    },
    {
      icon: <CalenderIcon />,
      name: 'Calendar',
      path: '/calendar',
    },
  ],

  othersItems: [
    {
      icon: <UserCircleIcon />,
      name: 'User Profile',
      path: '/profile',
    },
  ],
};
