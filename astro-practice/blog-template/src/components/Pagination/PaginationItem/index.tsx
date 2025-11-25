import { memo } from 'react';

import { cn } from '@/utils';

interface PaginationItemProps {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
}

const PaginationItem = ({ page, isActive, onClick }: PaginationItemProps) => {
  const handleClick = () => onClick(page);

  const buttonClassName = isActive
    ? 'bg-primary text-secondary cursor-default'
    : 'text-primary hover:text-tertiary cursor-pointer';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded text-base font-medium transition-colors',
        buttonClassName,
      )}
    >
      {page}
    </button>
  );
};

export default memo(PaginationItem);
