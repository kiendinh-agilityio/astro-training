import { getImage } from 'astro:assets';

import type { ImageMetadata } from 'astro';

/**
 * Generates a blur placeholder image (low quality, small size)
 * Returns base64 data URL for blur effect
 */
export const generateBlurPlaceholder = async (
  image: ImageMetadata,
  width: number,
  height: number,
): Promise<string> => {
  const blurImage = await getImage({
    src: image,
    width: Math.min(20, width),
    height: Math.min(20, height),
    format: 'webp',
    quality: 20,
  });

  return blurImage.src;
};
