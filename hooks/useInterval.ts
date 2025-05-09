import { useEffect, useRef } from 'react';

/**
 * Custom hook for setting up interval that can be paused and resumed
 * @param callback The function to call on each interval
 * @param delay The delay in milliseconds. If null, the interval is paused
 */
export function useInterval(
  callback: () => void,
  delay: number | null
): void {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    // Don't schedule if delay is null
    if (delay === null) return;

    function tick() {
      savedCallback.current?.();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}