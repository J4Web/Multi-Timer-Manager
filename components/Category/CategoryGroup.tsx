import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { ChevronRight, ChevronDown, Play, Pause, RotateCcw } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import TimerItem from '../Timer/TimerItem';
import { useTimerContext } from '@/context/TimerContext';
import Button from '../UI/Button';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CategoryGroupProps {
  categoryId: string;
}

export default function CategoryGroup({ categoryId }: CategoryGroupProps) {
  const {
    state,
    toggleCategoryExpanded,
    startCategoryTimers,
    pauseCategoryTimers,
    resetCategoryTimers,
  } = useTimerContext();

  // Find category
  const category = state.categories.find((c) => c.id === categoryId);
  if (!category) return null;

  // Get timers for this category
  const timersInCategory = state.timers.filter((t) => t.category === categoryId);

  // Calculate counts for different timer statuses
  const runningCount = timersInCategory.filter((t) => t.status === 'running').length;
  const completedCount = timersInCategory.filter((t) => t.status === 'completed').length;
  const totalCount = timersInCategory.length;

  // Handle toggle expand
  const handleToggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleCategoryExpanded(categoryId);
  };

  // No timers in this category
  if (timersInCategory.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Category Header */}
      <TouchableOpacity 
        onPress={handleToggleExpand}
        style={styles.headerContainer}
      >
        <View style={styles.titleContainer}>
          {category.isExpanded ? (
            <ChevronDown size={20} color={colors.neutral[700]} />
          ) : (
            <ChevronRight size={20} color={colors.neutral[700]} />
          )}
          <Text style={styles.title}>{category.name}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{totalCount}</Text>
          </View>
        </View>
        
        {/* Status summary */}
        <Text style={styles.statusSummary}>
          {runningCount > 0 && (
            <Text style={styles.runningText}>{runningCount} running </Text>
          )}
          {completedCount > 0 && (
            <Text style={styles.completedText}>{completedCount} completed</Text>
          )}
        </Text>
      </TouchableOpacity>
      
      {/* Category Actions */}
      <View style={styles.actionsContainer}>
        <Button
          title="Start All"
          onPress={() => startCategoryTimers(categoryId)}
          variant="primary"
          size="small"
          leftIcon={<Play size={16} color={colors.white} />}
          disabled={timersInCategory.every(t => t.status === 'completed')}
        />
        <Button
          title="Pause All"
          onPress={() => pauseCategoryTimers(categoryId)}
          variant="outline"
          size="small"
          leftIcon={<Pause size={16} color={colors.primary[500]} />}
          disabled={runningCount === 0}
        />
        <Button
          title="Reset All"
          onPress={() => resetCategoryTimers(categoryId)}
          variant="outline"
          size="small"
          leftIcon={<RotateCcw size={16} color={colors.primary[500]} />}
        />
      </View>
      
      {/* Timer List (expandable) */}
      {category.isExpanded && (
        <View style={styles.timerList}>
          {timersInCategory.map((timer) => (
            <TimerItem key={timer.id} id={timer.id} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  headerContainer: {
    flexDirection: 'column',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold as any,
    color: colors.neutral[900],
    marginLeft: spacing.xs,
  },
  countBadge: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginLeft: spacing.sm,
  },
  countText: {
    color: colors.white,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium as any,
  },
  statusSummary: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[600],
    marginTop: spacing.xs,
    marginLeft: spacing.xl,
  },
  runningText: {
    color: colors.primary[600],
    fontWeight: typography.fontWeights.medium as any,
  },
  completedText: {
    color: colors.success[600],
    fontWeight: typography.fontWeights.medium as any,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  timerList: {
    marginTop: spacing.md,
  },
});