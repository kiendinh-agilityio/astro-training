import { cn } from '@/utils';
import './index.css';

import PaginationItem from './PaginationItem';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  // Generate page numbers dynamically based on totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (page: number) => {
    const isValid = page >= 1 && page <= totalPages;
    if (isValid && page !== currentPage) onPageChange(page);
  };

  const isPageActive = (page: number) => page === currentPage;

  return (
    <nav
      className={cn('pagination-list flex justify-center gap-2', className)}
      aria-label="Pagination Navigation"
    >
      {pages.map((page) => (
        <PaginationItem
          key={page}
          page={page}
          isActive={isPageActive(page)}
          onClick={handlePageClick}
        />
      ))}
    </nav>
  );
};

export default Pagination;
