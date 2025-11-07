const HeroSkeleton = () => (
  <div className="container mx-auto px-5 md:px-8 2xl:px-28" aria-hidden="true">
    <section className="relative w-full pt-8 lg:pt-[72px]">
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div className="relative w-full md:aspect-[768/400] lg:aspect-[1216/400]">
          <div className="h-[400px] w-full rounded-2xl bg-gray-200 lg:h-full" />
          <div className="absolute inset-0 z-40 flex h-full animate-pulse flex-col justify-between bg-gradient-to-t from-white/10 via-white/20 to-white/10 px-4 py-7 lg:px-12 lg:pt-12 lg:pb-[42px]">
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded bg-white/60" />
              <div className="h-10 w-2/3 rounded bg-white/60" />
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="h-3 w-24 rounded bg-white/60" />
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/60" />
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-white/60" />
                  <div className="h-3 w-16 rounded bg-white/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HeroSkeleton;
