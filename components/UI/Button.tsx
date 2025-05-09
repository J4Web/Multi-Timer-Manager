import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  // Get button styles based on variant and size
  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    style,
  ];

  // Get text styles based on variant and size
  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.primary[500] : colors.white}
        />
      ) : (
        <>
          {leftIcon && leftIcon}
          <Text style={textStyles}>{title}</Text>
          {rightIcon && rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  
  // Variants
  primaryButton: {
    backgroundColor: colors.primary[500],
  },
  secondaryButton: {
    backgroundColor: colors.secondary[500],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  dangerButton: {
    backgroundColor: colors.error[500],
  },
  successButton: {
    backgroundColor: colors.success[500],
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  smallButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 32,
  },
  mediumButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 40,
  },
  largeButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  
  // Disabled state
  disabledButton: {
    backgroundColor: colors.neutral[300],
    borderColor: colors.neutral[300],
  },
  
  // Text styles
  text: {
    fontWeight: typography.fontWeights.medium as any,
    textAlign: 'center',
  },
  
  // Text variants
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary[500],
  },
  dangerText: {
    color: colors.white,
  },
  successText: {
    color: colors.white,
  },
  ghostText: {
    color: colors.primary[500],
  },
  
  // Text sizes
  smallText: {
    fontSize: typography.fontSizes.sm,
  },
  mediumText: {
    fontSize: typography.fontSizes.md,
  },
  largeText: {
    fontSize: typography.fontSizes.lg,
  },
  
  // Disabled text
  disabledText: {
    color: colors.neutral[600],
  },
});