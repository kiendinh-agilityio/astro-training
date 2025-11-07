const OverviewSkeleton = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 h-10 w-11/12 max-w-2xl rounded bg-gray-200" />
      <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-100" />
        </div>
        <span className="hidden h-2 w-2 rounded-full bg-gray-100 md:block" />
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default OverviewSkeleton;
