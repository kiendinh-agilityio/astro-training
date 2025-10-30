import { useState } from 'react';

import { useDocumentListeners } from '@/hooks/useDocumentListeners';
import type { NavbarItem as NavbarItemType } from '@/types';
import { cn } from '@/utils';

import Icons from '../Icons';
import NavbarItem from './NavbarItem/index';

export interface NavbarProps {
  items: NavbarItemType[];
  className?: string;
}

const Navbar = ({ items, className }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  /** Close menu on Escape key or click outside */
  const handleEscape: EventListener = (e) => {
    const event = e as KeyboardEvent;

    if (event.key === 'Escape') closeMenu();
  };

  const handleClickOutside: EventListener = (e) => {
    const target = e.target as Element;

    const navbar = target.closest('[data-navbar]');
    if (!navbar) closeMenu();
  };

  useDocumentListeners(isMenuOpen, [
    ['keydown', handleEscape],
    ['click', handleClickOutside],
  ]);

  return (
    <div data-navbar className="relative">
      {/* Desktop Navigation */}
      <nav
        className={cn('hidden lg:flex', className)}
        aria-label="Global navigation"
      >
        <ul className="flex items-center">
          {items.map((item) => (
            <NavbarItem key={item.href} item={item} onCloseMenu={closeMenu} />
          ))}
        </ul>
      </nav>

      {/* Mobile/Tablet Toggle */}
      <button
        className="cursor-pointer p-2 lg:hidden"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <Icons.Burger />
      </button>

      {/* Mobile/Tablet Dropdown */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-50 w-full bg-white shadow-lg lg:hidden">
          <nav
            aria-label="Mobile navigation"
            className="container mx-auto px-5 pt-2 pb-6 md:px-8"
          >
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <NavbarItem
                  key={item.href}
                  item={item}
                  isMobile
                  onCloseMenu={closeMenu}
                />
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
