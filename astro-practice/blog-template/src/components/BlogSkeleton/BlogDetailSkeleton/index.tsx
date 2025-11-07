import AuthorInfoSkeleton from '../AuthorInfoSkeleton';
import ContentSkeleton from '../ContentSkeleton';
import OverviewSkeleton from '../OverviewSkeleton';

const BlogDetailSkeleton = () => {
  return (
    <div
      className="container mx-auto px-5 py-8 md:px-8 lg:py-[72px] 2xl:px-[360px]"
      aria-hidden="true"
    >
      <article className="mx-auto max-w-4xl animate-pulse">
        <div className="flex flex-col border-b border-[#e3e3e3] pb-8">
          <AuthorInfoSkeleton />
          <OverviewSkeleton />
        </div>
        <ContentSkeleton />
      </article>
    </div>
  );
};

export default BlogDetailSkeleton;
