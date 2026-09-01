import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ChevronDownIcon, HorizontaLDots } from '../icons';
import { useSidebar } from '../context/SidebarContext';
import type { SidebarConfig, SidebarNavItem } from './types';

type AppSidebarProps = {
  config: SidebarConfig;
};

const AppSidebar: React.FC<AppSidebarProps> = ({ config }) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others';
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /**
   * Check whether the current route matches a navigation item.
   */
  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  /**
   * Automatically open the submenu containing the active route.
   */
  useEffect(() => {
    let submenuMatched = false;

    const menuGroups: {
      type: 'main' | 'others';
      items: SidebarNavItem[];
    }[] = [
      {
        type: 'main',
        items: config.navItems,
      },
      {
        type: 'others',
        items: config.othersItems,
      },
    ];

    for (const { type, items } of menuGroups) {
      items.forEach((nav, index) => {
        if (!nav.subItems) {
          return;
        }

        const hasActiveSubItem = nav.subItems.some((subItem) => isActive(subItem.path));

        if (hasActiveSubItem) {
          setOpenSubmenu({
            type,
            index,
          });

          submenuMatched = true;
        }
      });
    }

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [config.navItems, config.othersItems, isActive]);

  /**
   * Calculate submenu height whenever the submenu changes.
   */
  useEffect(() => {
    if (openSubmenu === null) {
      return;
    }

    const key = `${openSubmenu.type}-${openSubmenu.index}`;
    const element = subMenuRefs.current[key];

    if (!element) {
      return;
    }

    setSubMenuHeight((previousHeights) => ({
      ...previousHeights,
      [key]: element.scrollHeight,
    }));
  }, [openSubmenu]);

  /**
   * Toggle a submenu.
   */
  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu((previous) => {
      if (previous && previous.type === menuType && previous.index === index) {
        return null;
      }

      return {
        type: menuType,
        index,
      };
    });
  };

  /**
   * Render a group of sidebar navigation items.
   */
  const renderMenuItems = (items: SidebarNavItem[], menuType: 'main' | 'others') => {
    return (
      <ul className="flex flex-col gap-4">
        {items.map((nav, index) => {
          const isSubmenuOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;

          return (
            <li key={nav.name}>
              {nav.subItems ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleSubmenuToggle(index, menuType)}
                    className={`menu-item group ${
                      isSubmenuOpen ? 'menu-item-active' : 'menu-item-inactive'
                    } cursor-pointer ${
                      !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'
                    }`}
                  >
                    <span
                      className={`menu-item-icon-size ${
                        isSubmenuOpen ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
                      }`}
                    >
                      {nav.icon}
                    </span>

                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}

                    {(isExpanded || isHovered || isMobileOpen) && (
                      <ChevronDownIcon
                        className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                          isSubmenuOpen ? 'rotate-180 text-brand-500' : ''
                        }`}
                      />
                    )}
                  </button>

                  {(isExpanded || isHovered || isMobileOpen) && (
                    <div
                      ref={(element) => {
                        subMenuRefs.current[`${menuType}-${index}`] = element;
                      }}
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        height: isSubmenuOpen
                          ? `${subMenuHeight[`${menuType}-${index}`] ?? 0}px`
                          : '0px',
                      }}
                    >
                      <ul className="mt-2 ml-9 space-y-1">
                        {nav.subItems.map((subItem) => {
                          const active = isActive(subItem.path);

                          return (
                            <li key={subItem.name}>
                              <Link
                                to={subItem.path}
                                className={`menu-dropdown-item ${
                                  active
                                    ? 'menu-dropdown-item-active'
                                    : 'menu-dropdown-item-inactive'
                                }`}
                              >
                                {subItem.name}

                                <span className="ml-auto flex items-center gap-1">
                                  {subItem.new && (
                                    <span
                                      className={`menu-dropdown-badge ${
                                        active
                                          ? 'menu-dropdown-badge-active'
                                          : 'menu-dropdown-badge-inactive'
                                      }`}
                                    >
                                      new
                                    </span>
                                  )}

                                  {subItem.pro && (
                                    <span
                                      className={`menu-dropdown-badge ${
                                        active
                                          ? 'menu-dropdown-badge-active'
                                          : 'menu-dropdown-badge-inactive'
                                      }`}
                                    >
                                      pro
                                    </span>
                                  )}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                nav.path && (
                  <Link
                    to={nav.path}
                    className={`menu-item group ${
                      isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                    }`}
                  >
                    <span
                      className={`menu-item-icon-size ${
                        isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
                      }`}
                    >
                      {nav.icon}
                    </span>

                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                  </Link>
                )
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const showExpandedContent = isExpanded || isHovered || isMobileOpen;

  return (
    <aside
      className={`fixed left-0 top-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 lg:mt-0 ${
        isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      onMouseEnter={() => {
        if (!isExpanded) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Project / Logo */}
      <div
        className={`flex py-8 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
      >
        <Link to={config.projectDetails?.href ?? '/'}>
          {showExpandedContent ? (
            config.projectDetails?.logo || config.projectDetails?.darkLogo ? (
              <>
                {config.projectDetails?.logo && (
                  <img
                    className={config.projectDetails.darkLogo ? 'dark:hidden' : ''}
                    src={config.projectDetails.logo}
                    alt={config.projectDetails.name ?? 'Logo'}
                    width={config.projectDetails.logoWidth ?? 150}
                    height={config.projectDetails.logoHeight ?? 40}
                  />
                )}

                {config.projectDetails?.darkLogo && (
                  <img
                    className="hidden dark:block"
                    src={config.projectDetails.darkLogo}
                    alt={config.projectDetails.name ?? 'Logo'}
                    width={config.projectDetails.logoWidth ?? 150}
                    height={config.projectDetails.logoHeight ?? 40}
                  />
                )}
              </>
            ) : (
              <span className="text-xl font-semibold">
                {config.projectDetails?.name ?? 'Company'}
              </span>
            )
          ) : config.projectDetails?.collapsedLogo ? (
            <img
              src={config.projectDetails.collapsedLogo}
              alt={config.projectDetails.name ?? 'Logo'}
              width={32}
              height={32}
            />
          ) : config.projectDetails?.logo ? (
            <img
              src={config.projectDetails.logo}
              alt={config.projectDetails.name ?? 'Logo'}
              width={32}
              height={32}
            />
          ) : (
            <span className="text-lg font-semibold">
              {config.projectDetails?.name?.charAt(0).toUpperCase() ?? 'C'}
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {/* Main navigation */}
            <div>
              <h2
                className={`mb-4 flex text-xs uppercase leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                }`}
              >
                {showExpandedContent ? 'Menu' : <HorizontaLDots className="size-6" />}
              </h2>

              {renderMenuItems(config.navItems, 'main')}
            </div>

            {/* Other navigation */}
            {config.othersItems.length > 0 && (
              <div>
                <h2
                  className={`mb-4 flex text-xs uppercase leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                  }`}
                >
                  {showExpandedContent ? 'Others' : <HorizontaLDots className="size-6" />}
                </h2>

                {renderMenuItems(config.othersItems, 'others')}
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
