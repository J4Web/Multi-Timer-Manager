import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Play, Pause, RotateCcw } from 'lucide-react-native';
import { colors, spacing } from '@/constants/theme';
import Button from '../UI/Button';

interface TimerControlsProps {
  status: 'idle' | 'running' | 'paused' | 'completed';
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  disabled?: boolean;
}

export default function TimerControls({
  status,
  onStart,
  onPause,
  onReset,
  disabled = false,
}: TimerControlsProps) {
  return (
    <View style={styles.container}>
      {/* Start/Pause Button */}
      {(status === 'idle' || status === 'paused') && (
        <Button
          title="Start"
          onPress={onStart}
          disabled={disabled || status === 'completed'}
          variant="primary"
          size="small"
          leftIcon={<Play size={18} color={colors.white} />}
        />
      )}
      
      {status === 'running' && (
        <Button
          title="Pause"
          onPress={onPause}
          disabled={disabled}
          variant="warning"
          size="small"
          leftIcon={<Pause size={18} color={colors.white} />}
        />
      )}
      
      {/* Reset Button */}
      <Button
        title="Reset"
        onPress={onReset}
        disabled={disabled || (status === 'idle' && true)}
        variant="outline"
        size="small"
        leftIcon={<RotateCcw size={18} color={colors.primary[500]} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: spacing.sm,
  },
});