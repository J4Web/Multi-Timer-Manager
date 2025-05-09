import { useEffect } from 'react';
import { useTimerContext } from '@/context/TimerContext';
import { useInterval } from './useInterval';

/**
 * Hook to manage the timer ticking logic for all active timers
 */
export function useTimerTick(): void {
  const { state, dispatch, completeTimer } = useTimerContext();
  
  // Set up interval to update running timers every second
  useInterval(
    () => {
      // Update all running timers
      state.timers.forEach((timer) => {
        if (timer.status === 'running') {
          // Check if timer has reached completion
          if (timer.remainingTime <= 1) {
            completeTimer(timer.id);
          } else {
            // Otherwise, tick the timer down
            dispatch({ type: 'TICK_TIMER', payload: timer.id });
          }
          
          // Check for halfway point alert if enabled
          if (
            timer.halfwayAlert &&
            !timer.halfwayAlertTriggered &&
            timer.remainingTime <= timer.duration / 2
          ) {
            dispatch({ type: 'TRIGGER_HALFWAY_ALERT', payload: timer.id });
          }
        }
      });
    },
    1000 // Tick every second
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // No cleanup needed, interval is handled by useInterval hook
    };
  }, []);
}