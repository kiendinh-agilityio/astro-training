import { Pagination } from '@/components';
import { usePagination } from '@/hooks';

const BlogList = ({
  totalPosts,
  postsPerPage = 6,
}: {
  totalPosts: number;
  postsPerPage?: number;
}) => {
  const { currentPage, totalPages, setCurrentPage } = usePagination(
    totalPosts,
    postsPerPage,
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 lg:mt-12">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogList;
