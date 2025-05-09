import { TimerState, TimerAction, Timer } from '@/types/timer';

export const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };

    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id ? { ...action.payload, updatedAt: Date.now() } : timer
        ),
      };

    case 'REMOVE_TIMER':
      return {
        ...state,
        timers: state.timers.filter((timer) => timer.id !== action.payload),
      };

    case 'START_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, status: 'running', updatedAt: Date.now() }
            : timer
        ),
      };

    case 'PAUSE_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, status: 'paused', updatedAt: Date.now() }
            : timer
        ),
      };

    case 'RESET_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? {
                ...timer,
                remainingTime: timer.duration,
                status: 'idle',
                updatedAt: Date.now(),
                halfwayAlertTriggered: false,
              }
            : timer
        ),
      };

    case 'COMPLETE_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? {
                ...timer,
                remainingTime: 0,
                status: 'completed',
                updatedAt: Date.now(),
              }
            : timer
        ),
      };

    case 'TICK_TIMER': {
      const timer = state.timers.find((t) => t.id === action.payload);
      
      if (!timer || timer.status !== 'running') {
        return state;
      }

      // If timer has reached 0, mark as completed
      if (timer.remainingTime <= 1) {
        return {
          ...state,
          timers: state.timers.map((t) =>
            t.id === action.payload
              ? {
                  ...t,
                  remainingTime: 0,
                  status: 'completed',
                  updatedAt: Date.now(),
                }
              : t
          ),
        };
      }

      // Otherwise, decrease the remaining time
      return {
        ...state,
        timers: state.timers.map((t) =>
          t.id === action.payload
            ? {
                ...t,
                remainingTime: Math.max(0, t.remainingTime - 1),
                updatedAt: Date.now(),
              }
            : t
        ),
      };
    }

    case 'TOGGLE_HALFWAY_ALERT':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id
            ? { ...timer, halfwayAlert: action.payload.value, updatedAt: Date.now() }
            : timer
        ),
      };

    case 'TRIGGER_HALFWAY_ALERT':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, halfwayAlertTriggered: true, updatedAt: Date.now() }
            : timer
        ),
      };

    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };

    case 'REMOVE_CATEGORY': {
      // Move timers from this category to 'default'
      const updatedTimers = state.timers.map((timer) =>
        timer.category === action.payload
          ? { ...timer, category: 'default', updatedAt: Date.now() }
          : timer
      );

      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
        timers: updatedTimers,
      };
    }

    case 'TOGGLE_CATEGORY_EXPANDED':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload
            ? { ...category, isExpanded: !category.isExpanded }
            : category
        ),
      };

    case 'START_CATEGORY_TIMERS': {
      const categoryId = action.payload;
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === categoryId && timer.status !== 'completed'
            ? { ...timer, status: 'running', updatedAt: Date.now() }
            : timer
        ),
      };
    }

    case 'PAUSE_CATEGORY_TIMERS': {
      const categoryId = action.payload;
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === categoryId && timer.status === 'running'
            ? { ...timer, status: 'paused', updatedAt: Date.now() }
            : timer
        ),
      };
    }

    case 'RESET_CATEGORY_TIMERS': {
      const categoryId = action.payload;
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === categoryId
            ? {
                ...timer,
                remainingTime: timer.duration,
                status: 'idle',
                updatedAt: Date.now(),
                halfwayAlertTriggered: false,
              }
            : timer
        ),
      };
    }

    case 'ADD_TIMER_LOG':
      return {
        ...state,
        timerLogs: [...state.timerLogs, action.payload],
      };

    case 'SET_TIMERS':
      return {
        ...state,
        timers: action.payload,
      };

    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };

    case 'SET_TIMER_LOGS':
      return {
        ...state,
        timerLogs: action.payload,
      };

    default:
      return state;
  }
};