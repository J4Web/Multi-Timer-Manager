export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: 'idle' | 'running' | 'paused' | 'completed';
  createdAt: number;
  updatedAt: number;
  halfwayAlert: boolean;
  halfwayAlertTriggered?: boolean;
}

export interface TimerLog {
  id: string;
  timerId: string;
  name: string;
  category: string;
  duration: number;
  completedAt: number;
}

export interface Category {
  id: string;
  name: string;
  color?: string; // For visual distinction
  isExpanded?: boolean; // For UI state
}

export type TimerAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: Timer }
  | { type: 'REMOVE_TIMER'; payload: string }
  | { type: 'START_TIMER'; payload: string }
  | { type: 'PAUSE_TIMER'; payload: string }
  | { type: 'RESET_TIMER'; payload: string }
  | { type: 'COMPLETE_TIMER'; payload: string }
  | { type: 'TICK_TIMER'; payload: string }
  | { type: 'TOGGLE_HALFWAY_ALERT'; payload: { id: string; value: boolean } }
  | { type: 'TRIGGER_HALFWAY_ALERT'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'REMOVE_CATEGORY'; payload: string }
  | { type: 'TOGGLE_CATEGORY_EXPANDED'; payload: string }
  | { type: 'START_CATEGORY_TIMERS'; payload: string }
  | { type: 'PAUSE_CATEGORY_TIMERS'; payload: string }
  | { type: 'RESET_CATEGORY_TIMERS'; payload: string }
  | { type: 'ADD_TIMER_LOG'; payload: TimerLog }
  | { type: 'SET_TIMERS'; payload: Timer[] }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_TIMER_LOGS'; payload: TimerLog[] };

export interface TimerState {
  timers: Timer[];
  categories: Category[];
  timerLogs: TimerLog[];
}
