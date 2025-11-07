import type { PropsWithChildren } from 'react';

import { SKELETON_DELAY_MS } from '@/constants';
import { useDelay } from '@/hooks/useDelay';

import BlogSkeleton from './BlogSectionSkeleton/index';
import HeroSkeleton from './HeroSectionSkeleton/index';

interface HomeSkeletonProps {
  delay?: number;
}

const HomeSkeleton = ({
  children,
  delay = SKELETON_DELAY_MS,
}: PropsWithChildren<HomeSkeletonProps>) => {
  const isReady = useDelay(delay);

  if (!isReady)
    return (
      <div className="space-y-8 lg:space-y-14" aria-hidden="true">
        <HeroSkeleton />
        <BlogSkeleton />
      </div>
    );

  return <>{children}</>;
};

export default HomeSkeleton;
