import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, borderRadius, shadows, spacing } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export default function Card({
  children,
  style,
  elevation = 'medium',
  padding = 'medium',
}: CardProps) {
  const cardElevation = {
    none: shadows.none,
    low: shadows.sm,
    medium: shadows.md,
    high: shadows.lg,
  }[elevation];

  const cardPadding = {
    none: 0,
    small: spacing.sm,
    medium: spacing.md,
    large: spacing.lg,
  }[padding];

  return (
    <View
      style={[
        styles.card,
        {
          padding: cardPadding,
          ...cardElevation,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    overflow: 'hidden',
    marginVertical: spacing.sm,
  },
});