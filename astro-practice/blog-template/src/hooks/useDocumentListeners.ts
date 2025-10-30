import { useEffect } from 'react';

type Listener = [keyof DocumentEventMap, EventListener];

export const useDocumentListeners = (
  isActive: boolean,
  listeners: Listener[],
) => {
  useEffect(() => {
    if (!isActive) return;

    listeners.forEach(([event, handler]) =>
      document.addEventListener(event, handler),
    );

    return () => {
      listeners.forEach(([event, handler]) =>
        document.removeEventListener(event, handler),
      );
    };
  }, [isActive, ...listeners.map(([_, handler]) => handler)]);
};
