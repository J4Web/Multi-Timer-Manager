import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { spacing, typography } from '@/constants/theme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.neutral[100] }]}>
      <View style={styles.content}>
        <Sun size={20} color={colors.neutral[700]} />
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{
            false: colors.neutral[200],
            true: colors.primary[500],
          }}
          thumbColor={colors.white}
          style={styles.switch}
        />
        <Moon size={20} color={colors.neutral[700]} />
      </View>
      <Text style={[styles.label, { color: colors.neutral[600] }]}>
        {theme === 'light' ? 'Light' : 'Dark'} Mode
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  switch: {
    marginHorizontal: spacing.xs,
  },
  label: {
    marginTop: spacing.xs,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium as any,
  },
});