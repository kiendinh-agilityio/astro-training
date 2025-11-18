import imageUrlBuilder from '@sanity/image-url';

import { sanityClient } from '@/services/sanityClient';

import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanityClient);

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

export const getSanityImageUrl = (
  source?: SanityImageSource | null,
  options?: ImageOptions,
): string => {
  if (!source) return '';

  let pipeline = builder.image(source);

  if (options?.width) pipeline = pipeline.width(options.width);
  if (options?.height) pipeline = pipeline.height(options.height);
  if (options?.format) pipeline = pipeline.format(options.format);
  if (options?.quality) pipeline = pipeline.quality(options.quality);

  return pipeline.fit('crop').url();
};
