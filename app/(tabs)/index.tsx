import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import { useTimerContext } from '@/context/TimerContext';
import CategoryGroup from '@/components/Category/CategoryGroup';
import { useTimerTick } from '@/hooks/useTimerTick';

export default function HomeScreen() {
  const { state } = useTimerContext();
  
  // Start the timer tick hook
  useTimerTick();

  // Group timers by category
  const categories = state.categories;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Timers</Text>
        <Text style={styles.subtitle}>
          {state.timers.length} timer{state.timers.length !== 1 ? 's' : ''} in{' '}
          {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'}
        </Text>
      </View>
      
      {state.timers.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No timers yet</Text>
          <Text style={styles.emptyStateText}>
            Create your first timer by tapping the "Add Timer" tab below.
          </Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Display timers grouped by category */}
          {categories.map((category) => (
            <CategoryGroup key={category.id} categoryId={category.id} />
          ))}
        </ScrollView>
      )}
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: spacing.md,
    paddingBottom: spacing['3xl'],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold as any,
    color: colors.neutral[800],
    marginBottom: spacing.md,
  },
  emptyStateText: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
  },
});