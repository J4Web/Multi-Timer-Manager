import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { formatTime } from '@/utils/timeUtils';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { useTimerContext } from '@/context/TimerContext';
import TimerProgressBar from '../UI/TimerProgressBar';
import TimerControls from './TimerControls';
import Card from '../UI/Card';
import CompletionModal from '../UI/CompletionModal';
import { AlertTriangle } from 'lucide-react-native';

interface TimerItemProps {
  id: string;
}

export default function TimerItem({ id }: TimerItemProps) {
  const {
    state,
    dispatch,
    startTimer,
    pauseTimer,
    resetTimer,
    isTimerHalfway,
  } = useTimerContext();
  
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [halfwayAlertVisible, setHalfwayAlertVisible] = useState(false);
  
  // Find timer from state
  const timer = state.timers.find((t) => t.id === id);
  
  if (!timer) {
    return null;
  }
  
  // Get category for this timer
  const category = state.categories.find((c) => c.id === timer.category);
  
  // Handle timer completion
  useEffect(() => {
    if (timer.status === 'completed' && timer.remainingTime === 0) {
      setCompletionModalVisible(true);
    }
  }, [timer.status, timer.remainingTime]);
  
  // Handle halfway alert
  useEffect(() => {
    if (timer.halfwayAlert && isTimerHalfway(timer.id)) {
      setHalfwayAlertVisible(true);
      dispatch({ type: 'TRIGGER_HALFWAY_ALERT', payload: timer.id });
      
      // Hide alert after 3 seconds
      const timeout = setTimeout(() => {
        setHalfwayAlertVisible(false);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [timer.remainingTime, timer.halfwayAlert, timer.halfwayAlertTriggered]);
  
  // Toggle halfway alert
  const handleToggleHalfwayAlert = (value: boolean) => {
    dispatch({
      type: 'TOGGLE_HALFWAY_ALERT',
      payload: { id: timer.id, value },
    });
  };

  // Get status badge styling
  const getStatusBadgeStyle = () => {
    switch (timer.status) {
      case 'running':
        return styles.runningBadge;
      case 'paused':
        return styles.pausedBadge;
      case 'completed':
        return styles.completedBadge;
      default:
        return styles.idleBadge;
    }
  };

  const getStatusTextStyle = () => {
    switch (timer.status) {
      case 'running':
        return styles.runningText;
      case 'paused':
        return styles.pausedText;
      case 'completed':
        return styles.completedText;
      default:
        return styles.idleText;
    }
  };

  // Get status label
  const getStatusLabel = () => {
    switch (timer.status) {
      case 'running':
        return 'Running';
      case 'paused':
        return 'Paused';
      case 'completed':
        return 'Completed';
      default:
        return 'Ready';
    }
  };

  return (
    <Card style={styles.container}>
      {/* Header with timer name and status */}
      <View style={styles.header}>
        <Text style={styles.title}>{timer.name}</Text>
        <View style={[styles.statusBadge, getStatusBadgeStyle()]}>
          <Text style={[styles.statusText, getStatusTextStyle()]}>
            {getStatusLabel()}
          </Text>
        </View>
      </View>
      
      {/* Halfway Alert */}
      {halfwayAlertVisible && (
        <View style={styles.halfwayAlert}>
          <AlertTriangle size={16} color={colors.warning[700]} />
          <Text style={styles.halfwayAlertText}>
            Halfway point reached!
          </Text>
        </View>
      )}
      
      {/* Display time */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formatTime(timer.remainingTime)}
        </Text>
        <Text style={styles.durationText}>
          / {formatTime(timer.duration)}
        </Text>
      </View>
      
      {/* Progress bar */}
      <TimerProgressBar
        currentTime={timer.remainingTime}
        totalTime={timer.duration}
        status={timer.status}
      />
      
      {/* Category indicator */}
      {category && (
        <Text style={styles.categoryText}>
          Category: {category.name}
        </Text>
      )}
      
      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TimerControls
          status={timer.status}
          onStart={() => startTimer(timer.id)}
          onPause={() => pauseTimer(timer.id)}
          onReset={() => resetTimer(timer.id)}
          disabled={timer.status === 'completed'}
        />
        
        {/* Halfway alert toggle */}
        <View style={styles.halfwayToggle}>
          <Text style={styles.halfwayToggleText}>Alert at halfway</Text>
          <Switch
            value={timer.halfwayAlert}
            onValueChange={handleToggleHalfwayAlert}
            trackColor={{ false: colors.neutral[300], true: colors.primary[300] }}
            thumbColor={timer.halfwayAlert ? colors.primary[500] : colors.neutral[100]}
          />
        </View>
      </View>
      
      {/* Completion Modal */}
      <CompletionModal
        visible={completionModalVisible}
        onClose={() => setCompletionModalVisible(false)}
        timerName={timer.name}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold as any,
    color: colors.neutral[900],
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
  },
  statusText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium as any,
  },
  idleBadge: {
    backgroundColor: colors.neutral[100],
  },
  runningBadge: {
    backgroundColor: colors.primary[100],
  },
  pausedBadge: {
    backgroundColor: colors.warning[100],
  },
  completedBadge: {
    backgroundColor: colors.success[100],
  },
  idleText: {
    color: colors.neutral[700],
  },
  runningText: {
    color: colors.primary[700],
  },
  pausedText: {
    color: colors.warning[700],
  },
  completedText: {
    color: colors.success[700],
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  timeText: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.bold as any,
    color: colors.neutral[900],
  },
  durationText: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral[500],
    marginLeft: spacing.xs,
  },
  categoryText: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[600],
    marginBottom: spacing.sm,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  halfwayToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  halfwayToggleText: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
    marginRight: spacing.sm,
  },
  halfwayAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning[50],
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  halfwayAlertText: {
    fontSize: typography.fontSizes.sm,
    color: colors.warning[700],
    marginLeft: spacing.xs,
    fontWeight: typography.fontWeights.medium as any,
  },
});