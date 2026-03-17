import { useEffect, useRef, RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  callback: () => void,
): RefObject<T> {
  const ref = useRef<T>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref;
}
