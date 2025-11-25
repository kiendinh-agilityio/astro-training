import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { SKELETON_DELAY_MS } from '@/constants';
import { useDelay } from '@/hooks/useDelay';
import { clearSkeletonFlag, getSkeletonFlag } from '@/utils';

import BlogSkeleton from './BlogSectionSkeleton';
import HeroSkeleton from './HeroSectionSkeleton';

interface HomeSkeletonProps {
  delay?: number;
}

const HomeSkeleton = ({
  children,
  delay = SKELETON_DELAY_MS,
}: PropsWithChildren<HomeSkeletonProps>) => {
  const [shouldShowSkeleton] = useState(getSkeletonFlag);
  const isReady = useDelay(delay);

  useEffect(() => {
    shouldShowSkeleton && clearSkeletonFlag();
  }, [shouldShowSkeleton]);

  if (shouldShowSkeleton && !isReady) {
    return (
      <div className="space-y-8 lg:space-y-14" aria-hidden="true">
        <HeroSkeleton />
        <BlogSkeleton />
      </div>
    );
  }

  return <>{children}</>;
};

export default HomeSkeleton;
