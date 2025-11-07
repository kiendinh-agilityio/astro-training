const BlogCardSkeleton = () => (
  <div
    className="group block animate-pulse overflow-hidden rounded-xl border border-transparent bg-gray-100 p-0"
    aria-hidden="true"
  >
    <div className="relative w-full overflow-hidden rounded-xl">
      <div className="h-[260px] w-full bg-gray-200 md:h-[260px] lg:h-[340px]" />
    </div>
    <div className="mt-4 space-y-3 lg:my-5">
      <div className="h-5 w-11/12 rounded bg-gray-200" />
      <div className="h-5 w-3/4 rounded bg-gray-200" />
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-200" />
        <div className="h-3 w-24 rounded bg-gray-200" />
      </div>
      <div className="h-3 w-16 rounded bg-gray-200" />
    </div>
  </div>
);

export default BlogCardSkeleton;
