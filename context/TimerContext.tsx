import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer, TimerLog, Category, TimerState, TimerAction } from '@/types/timer';
import { timerReducer } from '@/utils/timerReducer';

// Initial state
const initialState: TimerState = {
  timers: [],
  categories: [
    { id: 'default', name: 'Uncategorized', isExpanded: true },
    { id: 'workout', name: 'Workout', isExpanded: true },
    { id: 'study', name: 'Study', isExpanded: true },
    { id: 'break', name: 'Break', isExpanded: true },
  ],
  timerLogs: [],
};

// Create context
interface TimerContextProps {
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  completeTimer: (id: string) => void;
  startCategoryTimers: (categoryId: string) => void;
  pauseCategoryTimers: (categoryId: string) => void;
  resetCategoryTimers: (categoryId: string) => void;
  toggleCategoryExpanded: (categoryId: string) => void;
  addTimer: (timer: Omit<Timer, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'remainingTime'>) => void;
  addCategory: (category: Omit<Category, 'id' | 'isExpanded'>) => void;
  isTimerHalfway: (id: string) => boolean;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  TIMERS: 'timers',
  CATEGORIES: 'categories',
  TIMER_LOGS: 'timerLogs',
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // Load data from storage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const timersData = await AsyncStorage.getItem(STORAGE_KEYS.TIMERS);
        const categoriesData = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
        const timerLogsData = await AsyncStorage.getItem(STORAGE_KEYS.TIMER_LOGS);

        if (timersData) {
          dispatch({ type: 'SET_TIMERS', payload: JSON.parse(timersData) });
        }

        if (categoriesData) {
          dispatch({ type: 'SET_CATEGORIES', payload: JSON.parse(categoriesData) });
        } else {
          // If no categories found, save the default ones
          await AsyncStorage.setItem(
            STORAGE_KEYS.CATEGORIES, 
            JSON.stringify(initialState.categories)
          );
        }

        if (timerLogsData) {
          dispatch({ type: 'SET_TIMER_LOGS', payload: JSON.parse(timerLogsData) });
        }
      } catch (error) {
        console.error('Error loading data from storage:', error);
      }
    };

    loadData();
  }, []);

  // Save data to storage whenever state changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.TIMERS, JSON.stringify(state.timers));
        await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(state.categories));
        await AsyncStorage.setItem(STORAGE_KEYS.TIMER_LOGS, JSON.stringify(state.timerLogs));
      } catch (error) {
        console.error('Error saving data to storage:', error);
      }
    };

    saveData();
  }, [state]);

  // Timer functions
  const startTimer = (id: string) => {
    dispatch({ type: 'START_TIMER', payload: id });
  };

  const pauseTimer = (id: string) => {
    dispatch({ type: 'PAUSE_TIMER', payload: id });
  };

  const resetTimer = (id: string) => {
    dispatch({ type: 'RESET_TIMER', payload: id });
  };

  const completeTimer = (id: string) => {
    const timer = state.timers.find((t) => t.id === id);
    if (timer) {
      // Create a timer log entry
      const timerLog: TimerLog = {
        id: Date.now().toString(),
        timerId: timer.id,
        name: timer.name,
        category: timer.category,
        duration: timer.duration,
        completedAt: Date.now(),
      };
      
      dispatch({ type: 'ADD_TIMER_LOG', payload: timerLog });
      dispatch({ type: 'COMPLETE_TIMER', payload: id });
    }
  };

  // Category functions
  const startCategoryTimers = (categoryId: string) => {
    dispatch({ type: 'START_CATEGORY_TIMERS', payload: categoryId });
  };

  const pauseCategoryTimers = (categoryId: string) => {
    dispatch({ type: 'PAUSE_CATEGORY_TIMERS', payload: categoryId });
  };

  const resetCategoryTimers = (categoryId: string) => {
    dispatch({ type: 'RESET_CATEGORY_TIMERS', payload: categoryId });
  };

  const toggleCategoryExpanded = (categoryId: string) => {
    dispatch({ type: 'TOGGLE_CATEGORY_EXPANDED', payload: categoryId });
  };

  // Add new timer
  const addTimer = (timerData: Omit<Timer, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'remainingTime'>) => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      ...timerData,
      remainingTime: timerData.duration,
      status: 'idle',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    dispatch({ type: 'ADD_TIMER', payload: newTimer });
  };

  // Add new category
  const addCategory = (categoryData: Omit<Category, 'id' | 'isExpanded'>) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      ...categoryData,
      isExpanded: true,
    };
    
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
  };

  // Helper to check if timer is halfway
  const isTimerHalfway = (id: string): boolean => {
    const timer = state.timers.find((t) => t.id === id);
    if (!timer) return false;
    
    return timer.remainingTime <= timer.duration / 2 && !timer.halfwayAlertTriggered;
  };

  // Create the context value
  const contextValue: TimerContextProps = {
    state,
    dispatch,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimer,
    startCategoryTimers,
    pauseCategoryTimers,
    resetCategoryTimers,
    toggleCategoryExpanded,
    addTimer,
    addCategory,
    isTimerHalfway,
  };

  return <TimerContext.Provider value={contextValue}>{children}</TimerContext.Provider>;
};

// Custom hook for using the timer context
export const useTimerContext = (): TimerContextProps => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};