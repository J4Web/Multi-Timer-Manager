/**
 * Formats seconds into a human-readable time string (MM:SS or HH:MM:SS)
 */
export const formatTime = (seconds: number): string => {
  if (seconds < 0) seconds = 0;
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
  }
  
  return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
};

/**
 * Pads a number with a leading zero if it's less than 10
 */
const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

/**
 * Converts a time string (MM:SS or HH:MM:SS) to seconds
 */
export const timeStringToSeconds = (timeString: string): number => {
  const parts = timeString.split(':').map(Number);
  
  if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1];
  }
  
  return 0;
};

/**
 * Formats a date to a readable string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculates the percentage of time elapsed
 */
export const calculateProgressPercentage = (
  currentTime: number,
  totalTime: number
): number => {
  if (totalTime === 0) return 0;
  const remaining = Math.min(currentTime / totalTime, 1);
  return (1 - remaining) * 100;
};