import { useEffect, useRef, useState } from 'react';

import { AuthProvider } from '@/components';
import { ROUTER } from '@/constants/router';
import { useAuth } from '@/hooks/useAuth';
import type { NavbarItem as NavbarItemType } from '@/types';
import { cn } from '@/utils';

import Icons from '../Icons';
import NavbarItem from './NavbarItem/index';

export interface NavbarProps {
  items: NavbarItemType[];
  className?: string;
}

const NavbarContent = ({ items, className }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen || !menuContainerRef.current) return;

    menuContainerRef.current.focus();
  }, [isMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await auth.logout();

    await new Promise((r) => setTimeout(r, 600));
    globalThis.location.href = ROUTER.LOGIN;
  };

  return (
    <div data-navbar className="relative">
      {/* Desktop Navigation */}
      <nav
        className={cn('hidden items-center gap-6 lg:flex', className)}
        aria-label="Global navigation"
      >
        <ul className="flex items-center">
          {items.map((item) => (
            <NavbarItem key={item.href} item={item} onCloseMenu={closeMenu} />
          ))}
        </ul>
        <button
          className="bg-primary text-secondary w-32 cursor-pointer rounded px-3 py-2 text-sm font-medium hover:bg-neutral-700"
          onClick={handleLogout}
          aria-label="Logout Button"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </nav>

      {/* Mobile/Tablet Toggle */}
      <button
        className="relative z-100 cursor-pointer p-2 lg:hidden"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <Icons.Burger />
      </button>

      {/* Mobile/Tablet Dropdown */}
      {isMenuOpen && (
        <div
          ref={menuContainerRef}
          className="fixed inset-0 z-50 m-0 w-full max-w-none overflow-visible bg-transparent p-0 lg:hidden"
          aria-label="Mobile navigation menu"
          tabIndex={-1}
        >
          <button
            type="button"
            className="absolute top-16 right-0 bottom-0 left-0 z-0 h-full w-full bg-black/20 backdrop-blur-sm"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
          <div className="absolute inset-x-0 top-16 z-10">
            <nav
              aria-label="Mobile navigation"
              className="w-full max-w-screen-lg bg-white shadow-lg"
            >
              <ul className="container mx-auto flex flex-col gap-6 px-5 pt-4 pb-6 md:px-8">
                {items.map((item) => (
                  <NavbarItem
                    key={item.href}
                    item={item}
                    isMobile
                    onCloseMenu={closeMenu}
                  />
                ))}
                <li>
                  <button
                    className="bg-primary text-secondary hover:bg-neutral-70 w-full cursor-pointer rounded px-3 py-2 text-center text-sm font-medium disabled:opacity-50"
                    onClick={handleLogout}
                    aria-label="Logout Button"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = (props: NavbarProps) => (
  <AuthProvider>
    <NavbarContent {...props} />
  </AuthProvider>
);

export default Navbar;
