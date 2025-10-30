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
  const handleLinkClick = () => onCloseMenu();

  const externalProps = item.isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <li className={cn(!isMobile && 'px-4 py-2.5')}>
      <a
        href={item.href}
        aria-label={item.ariaLabel}
        onClick={handleLinkClick}
        {...externalProps}
        className={cn(
          'text-primary hover:hover:text-tertiary block text-sm leading-[21px] font-medium transition-colors duration-200',
        )}
      >
        {item.label}
      </a>
    </li>
  );
};

export default NavbarItem;
