import { type ReactNode, useEffect, useRef } from 'react';

import { cn } from '@/utils';
import './index.css';

interface BlurImageWrapperProps {
  blurPlaceholderSrc?: string;
  blurAlt?: string;
  className?: string;
  wrapperClassName?: string;
  children: ReactNode;
}

const BlurImageWrapper = ({
  blurPlaceholderSrc,
  blurAlt = 'Blur Image',
  className,
  wrapperClassName,
  children,
}: BlurImageWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blurPlaceholderRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const mainImage = wrapper.querySelector('[data-main-image]');
    const blurImage = wrapper.querySelector('[data-blur-placeholder]');

    if (!(mainImage instanceof HTMLImageElement)) return;

    const blurImg =
      blurImage instanceof HTMLImageElement ? blurImage : undefined;

    const toggleOpacity = () => {
      mainImage.classList.replace('opacity-0', 'opacity-100');
      blurImg?.classList.replace('opacity-100', 'opacity-0');
    };

    if (mainImage.complete) {
      toggleOpacity();
    } else {
      mainImage.addEventListener('load', toggleOpacity);
      mainImage.addEventListener('error', toggleOpacity);

      return () => {
        mainImage.removeEventListener('load', toggleOpacity);
        mainImage.removeEventListener('error', toggleOpacity);
      };
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn('blur-image-wrapper', wrapperClassName)}
      data-image-wrapper
    >
      {blurPlaceholderSrc && (
        <img
          ref={blurPlaceholderRef}
          src={blurPlaceholderSrc}
          alt={blurAlt}
          aria-hidden="true"
          className="blur-image-placeholder"
          data-blur-placeholder
        />
      )}
      <div className={cn('blur-image-content', className)}>{children}</div>
    </div>
  );
};

export default BlurImageWrapper;
