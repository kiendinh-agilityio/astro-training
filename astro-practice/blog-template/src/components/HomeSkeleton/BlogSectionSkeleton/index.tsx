import BlogCardSkeleton from '../BlogCardSkeleton/index';

const PLACEHOLDER_IDS = [
  'blog-skeleton-0',
  'blog-skeleton-1',
  'blog-skeleton-2',
  'blog-skeleton-3',
  'blog-skeleton-4',
  'blog-skeleton-5',
];

const BlogSkeleton = () => (
  <div
    className="container mx-auto px-5 py-8 md:px-8 lg:py-14 2xl:px-28"
    aria-hidden="true"
  >
    <section className="w-full">
      <div className="mb-8 text-center lg:mb-12">
        <div className="mx-auto mb-3 h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto h-4 w-full animate-pulse rounded bg-gray-100" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_IDS.map((id) => (
          <BlogCardSkeleton key={id} />
        ))}
      </div>
    </section>
  </div>
);

export default BlogSkeleton;
