import { useEffect, useState } from 'react';

export const useDelay = (delay: number) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = globalThis.setTimeout(() => setIsReady(true), delay);

    return () => globalThis.clearTimeout(timer);
  }, [delay]);

  return isReady;
};
