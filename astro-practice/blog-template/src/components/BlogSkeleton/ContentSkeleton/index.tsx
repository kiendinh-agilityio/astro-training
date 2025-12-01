const ContentSkeleton = () => {
  return (
    <div className="mt-8">
      <div className="mb-10 space-y-4">
        <div className="h-8 w-full rounded bg-gray-100" />
      </div>
      <div className="mb-8 w-full overflow-hidden rounded-2xl lg:mb-12">
        <div className="h-[206px] w-full rounded-2xl bg-gray-200 lg:h-[405px]" />
      </div>
    </div>
  );
};

export default ContentSkeleton;
