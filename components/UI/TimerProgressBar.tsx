import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, borderRadius } from '@/constants/theme';
import { calculateProgressPercentage } from '@/utils/timeUtils';

interface TimerProgressBarProps {
  currentTime: number;
  totalTime: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
}

export default function TimerProgressBar({
  currentTime,
  totalTime,
  status,
}: TimerProgressBarProps) {
  // Calculate progress percentage
  const progressPercentage = calculateProgressPercentage(currentTime, totalTime);
  
  // Animation progress value
  const progressAnimation = React.useRef(new Animated.Value(0)).current;
  
  // Update animation when progress changes
  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: progressPercentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progressPercentage, progressAnimation]);
  
  // Map the animated value to width
  const width = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  // Determine color based on status and progress
  const getBarColor = () => {
    if (status === 'completed') return colors.success[500];
    if (status === 'paused') return colors.warning[500];
    
    // For running and idle timers, color based on progress
    if (progressPercentage < 30) return colors.error[500];
    if (progressPercentage < 70) return colors.warning[500];
    return colors.primary[500];
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width,
            backgroundColor: getBarColor(),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});