import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Check, Trophy } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import Button from './Button';

interface CompletionModalProps {
  visible: boolean;
  onClose: () => void;
  timerName: string;
}

export default function CompletionModal({
  visible,
  onClose,
  timerName,
}: CompletionModalProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations when modal becomes visible
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      
      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  const handleClose = () => {
    // Animate out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          
          <View style={styles.iconContainer}>
            <Trophy size={60} color={colors.success[500]} />
          </View>
          
          <Text style={styles.title}>Timer Complete!</Text>
          
          <Text style={styles.message}>
            Congratulations! You've completed the timer <Text style={styles.timerName}>{timerName}</Text>.
          </Text>
          
          <View style={styles.checkItem}>
            <Check size={20} color={colors.success[500]} />
            <Text style={styles.checkText}>
              Added to your timer history
            </Text>
          </View>
          
          <Button
            title="Close"
            onPress={handleClose}
            variant="primary"
            style={styles.button}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');
const modalWidth = Math.min(width - 48, 400);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: modalWidth,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: typography.fontWeights.bold as any,
    color: colors.neutral[500],
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.success[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold as any,
    color: colors.neutral[900],
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral[700],
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  timerName: {
    fontWeight: typography.fontWeights.semibold as any,
    color: colors.secondary[600],
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.success[50],
    borderRadius: borderRadius.md,
  },
  checkText: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSizes.md,
    color: colors.success[700],
  },
  button: {
    width: '100%',
    marginTop: spacing.md,
  },
});