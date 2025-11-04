import { HEADER_OFFSET } from '@/constants';
import type { NavbarItem as NavbarItemType } from '@/types';
import { cn } from '@/utils';

interface NavbarItemProps {
  item: NavbarItemType;
  isMobile?: boolean;
  onCloseMenu: () => void;
}

const NavbarItem = ({
  item,
  isMobile = false,
  onCloseMenu,
}: NavbarItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.isExternal) return;
    if (item.disabled) return (e.preventDefault(), e.stopPropagation());

    e.preventDefault();
    const { href } = item;

    if (!href.startsWith('#')) {
      window.location.href = href;
      return onCloseMenu();
    }

    const targetId = href.slice(1);
    window.location.pathname !== '/'
      ? (window.location.href = `/${href}`)
      : scrollToSection(targetId);

    onCloseMenu();
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const offset =
      window.innerWidth < 1024 ? HEADER_OFFSET.MOBILE : HEADER_OFFSET.DESKTOP;

    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth',
    });
  };

  const externalProps = item.isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <li className={cn(!isMobile && 'px-4 py-2.5')}>
      <a
        href={item.href}
        aria-label={item.ariaLabel}
        aria-disabled={item.disabled ? 'true' : undefined}
        tabIndex={item.disabled ? -1 : 0}
        onClick={handleClick}
        {...externalProps}
        className={cn(
          'block text-sm leading-[21px] font-medium transition-colors duration-200',
          item.disabled
            ? 'cursor-not-allowed'
            : 'text-primary hover:text-tertiary',
        )}
      >
        {item.label}
      </a>
    </li>
  );
};

export default NavbarItem;
