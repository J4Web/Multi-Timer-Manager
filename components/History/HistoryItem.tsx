import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { formatTime, formatDate } from '@/utils/timeUtils';
import Card from '../UI/Card';

interface HistoryItemProps {
  name: string;
  category: string;
  duration: number;
  completedAt: number;
}

export default function HistoryItem({
  name,
  category,
  duration,
  completedAt,
}: HistoryItemProps) {
  return (
    <Card elevation="low">
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Clock size={20} color={colors.success[500]} />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          
          <View style={styles.detailsRow}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.duration}>{formatTime(duration)}</Text>
          </View>
          
          <Text style={styles.date}>Completed: {formatDate(completedAt)}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold as any,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary[600],
    fontWeight: typography.fontWeights.medium as any,
  },
  duration: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
  },
  date: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
  },
});