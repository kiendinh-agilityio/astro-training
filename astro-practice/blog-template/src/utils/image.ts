import imageUrlBuilder from '@sanity/image-url';

import { sanityClient } from '@/services/sanityClient';

import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanityClient);

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

export const getSanityImageUrl = (
  source?: SanityImageSource | null,
  { width, height, quality, format }: ImageOptions = {},
): string => {
  if (!source) return '';

  let pipeline = builder.image(source);

  if (width) pipeline = pipeline.width(width);
  if (height) pipeline = pipeline.height(height);
  if (quality) pipeline = pipeline.quality(quality);
  if (format) pipeline = pipeline.format(format);

  return pipeline.fit('crop').url();
};
