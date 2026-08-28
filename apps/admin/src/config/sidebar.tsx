import {
  BoxCubeIcon,
  CalenderIcon,
  GridIcon,
  ListIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from '@companyio/platform-ui';

import type { SidebarConfig } from '@companyio/platform-ui';

export const sidebarConfig: SidebarConfig = {
  projectDetails: {
    name: 'Company Admin',
    logo: '',
    darkLogo: '',
    collapsedLogo: '',
    logoWidth: 150,
    logoHeight: 40,
  },

  navItems: [
    {
      icon: <GridIcon />,
      name: 'Dashboard',
      subItems: [
        {
          name: 'Overview',
          path: '/',
        },
      ],
    },
    {
      icon: <UserCircleIcon />,
      name: 'Users',
      path: '/users',
    },
    {
      icon: <CalenderIcon />,
      name: 'Calendar',
      path: '/calendar',
    },
    {
      icon: <ListIcon />,
      name: 'Forms',
      subItems: [
        {
          name: 'Form Elements',
          path: '/form-elements',
        },
      ],
    },
    {
      icon: <TableIcon />,
      name: 'Tables',
      subItems: [
        {
          name: 'Basic Tables',
          path: '/basic-tables',
        },
      ],
    },
  ],

  othersItems: [
    {
      icon: <PieChartIcon />,
      name: 'Charts',
      subItems: [
        {
          name: 'Line Chart',
          path: '/line-chart',
        },
        {
          name: 'Bar Chart',
          path: '/bar-chart',
        },
      ],
    },
    {
      icon: <BoxCubeIcon />,
      name: 'UI Elements',
      subItems: [
        {
          name: 'Alerts',
          path: '/alerts',
        },
        {
          name: 'Buttons',
          path: '/buttons',
        },
      ],
    },
    {
      icon: <PlugInIcon />,
      name: 'Authentication',
      subItems: [
        {
          name: 'Sign In',
          path: '/signin',
        },
      ],
    },
  ],
};
