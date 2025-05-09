import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  Text,
} from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import TimerForm from '@/components/Timer/TimerForm';

export default function AddTimerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Timer</Text>
        <Text style={styles.subtitle}>
          Create a new timer with duration and category
        </Text>
      </View>
      <TimerForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === 'ios' ? spacing.lg : spacing['2xl'],
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  title: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold as any,
    color: colors.neutral[900],
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
});