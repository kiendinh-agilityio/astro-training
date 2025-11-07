import type { PropsWithChildren } from 'react';

import { SKELETON_DELAY_MS } from '@/constants';
import { useDelay } from '@/hooks/useDelay';

import BlogDetailSkeleton from './BlogDetailSkeleton';

interface BlogSkeletonProps {
  delay?: number;
}

const BlogSkeleton = ({
  children,
  delay = SKELETON_DELAY_MS,
}: PropsWithChildren<BlogSkeletonProps>) => {
  const isReady = useDelay(delay);

  if (!isReady) return <BlogDetailSkeleton />;

  return <>{children}</>;
};

export default BlogSkeleton;
