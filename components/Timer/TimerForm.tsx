import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Switch,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { ChevronDown, Clock } from 'lucide-react-native';
import { useTimerContext } from '@/context/TimerContext';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import Button from '../UI/Button';
import Card from '../UI/Card';
import { timeStringToSeconds } from '@/utils/timeUtils';

export default function TimerForm() {
  const { state, addTimer } = useTimerContext();
  
  // Form state
  const [name, setName] = useState('');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState(state.categories[0]?.id || 'default');
  const [halfwayAlert, setHalfwayAlert] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  
  // Form errors
  const [errors, setErrors] = useState({
    name: '',
    duration: '',
  });
  
  // Clear form
  const clearForm = () => {
    setName('');
    setHours('0');
    setMinutes('0');
    setSeconds('0');
    setSelectedCategory(state.categories[0]?.id || 'default');
    setHalfwayAlert(false);
    setErrors({ name: '', duration: '' });
  };
  
  // Calculate total seconds
  const calculateTotalSeconds = (): number => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    
    return h * 3600 + m * 60 + s;
  };
  
  // Validate form
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { name: '', duration: '' };
    
    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    // Validate duration
    const totalSeconds = calculateTotalSeconds();
    if (totalSeconds <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const totalSeconds = calculateTotalSeconds();
      
      addTimer({
        name: name.trim(),
        duration: totalSeconds,
        category: selectedCategory,
        halfwayAlert,
      });
      
      clearForm();
    }
  };
  
  // Selected category name
  const selectedCategoryName = state.categories.find(
    (c) => c.id === selectedCategory
  )?.name || 'Select Category';
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Card>
        <Text style={styles.title}>Create New Timer</Text>
        
        {/* Timer Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Timer Name</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            value={name}
            onChangeText={setName}
            placeholder="e.g., Workout Timer"
            placeholderTextColor={colors.neutral[400]}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </View>
        
        {/* Duration */}
        <Text style={styles.label}>Duration</Text>
        <View style={styles.durationContainer}>
          <View style={styles.timeInputGroup}>
            <TextInput
              style={styles.timeInput}
              value={hours}
              onChangeText={(text) => setHours(text.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.timeLabel}>hrs</Text>
          </View>
          
          <Text style={styles.timeSeparator}>:</Text>
          
          <View style={styles.timeInputGroup}>
            <TextInput
              style={styles.timeInput}
              value={minutes}
              onChangeText={(text) => {
                const numValue = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                setMinutes(numValue > 59 ? '59' : text.replace(/[^0-9]/g, ''));
              }}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.timeLabel}>mins</Text>
          </View>
          
          <Text style={styles.timeSeparator}>:</Text>
          
          <View style={styles.timeInputGroup}>
            <TextInput
              style={styles.timeInput}
              value={seconds}
              onChangeText={(text) => {
                const numValue = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                setSeconds(numValue > 59 ? '59' : text.replace(/[^0-9]/g, ''));
              }}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.timeLabel}>secs</Text>
          </View>
        </View>
        {errors.duration ? (
          <Text style={styles.errorText}>{errors.duration}</Text>
        ) : null}
        
        {/* Quick Duration Buttons */}
        <View style={styles.quickDurationContainer}>
          <Text style={styles.quickDurationLabel}>Quick Durations:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickDurationButtons}
          >
            <TouchableOpacity 
              style={styles.quickDurationButton}
              onPress={() => {
                setHours('0');
                setMinutes('1');
                setSeconds('0');
              }}
            >
              <Clock size={16} color={colors.primary[500]} />
              <Text style={styles.quickDurationButtonText}>1 Min</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickDurationButton}
              onPress={() => {
                setHours('0');
                setMinutes('5');
                setSeconds('0');
              }}
            >
              <Clock size={16} color={colors.primary[500]} />
              <Text style={styles.quickDurationButtonText}>5 Mins</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickDurationButton}
              onPress={() => {
                setHours('0');
                setMinutes('10');
                setSeconds('0');
              }}
            >
              <Clock size={16} color={colors.primary[500]} />
              <Text style={styles.quickDurationButtonText}>10 Mins</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickDurationButton}
              onPress={() => {
                setHours('0');
                setMinutes('25');
                setSeconds('0');
              }}
            >
              <Clock size={16} color={colors.primary[500]} />
              <Text style={styles.quickDurationButtonText}>25 Mins</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickDurationButton}
              onPress={() => {
                setHours('1');
                setMinutes('0');
                setSeconds('0');
              }}
            >
              <Clock size={16} color={colors.primary[500]} />
              <Text style={styles.quickDurationButtonText}>1 Hour</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.categoryPicker}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <Text style={styles.categoryPickerText}>{selectedCategoryName}</Text>
            <ChevronDown size={20} color={colors.neutral[500]} />
          </TouchableOpacity>
          
          {showCategoryPicker && (
            <View style={styles.categoryDropdown}>
              {state.categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryOption,
                    category.id === selectedCategory && styles.selectedCategoryOption,
                  ]}
                  onPress={() => {
                    setSelectedCategory(category.id);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      category.id === selectedCategory && styles.selectedCategoryOptionText,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        {/* Halfway Alert */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Alert at Halfway Point</Text>
          <Switch
            value={halfwayAlert}
            onValueChange={setHalfwayAlert}
            trackColor={{ false: colors.neutral[300], true: colors.primary[300] }}
            thumbColor={halfwayAlert ? colors.primary[500] : colors.neutral[100]}
          />
        </View>
        
        {/* Submit Button */}
        <Button
          title="Create Timer"
          onPress={handleSubmit}
          variant="primary"
          size="large"
          style={styles.submitButton}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  contentContainer: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold as any,
    color: colors.neutral[900],
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium as any,
    color: colors.neutral[800],
    marginBottom: spacing.xs,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.neutral[900],
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.error[500],
  },
  errorText: {
    fontSize: typography.fontSizes.sm,
    color: colors.error[500],
    marginTop: spacing.xs,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  timeInputGroup: {
    alignItems: 'center',
  },
  timeInput: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    fontSize: typography.fontSizes.lg,
    textAlign: 'center',
    color: colors.neutral[900],
    backgroundColor: colors.white,
  },
  timeSeparator: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold as any,
    color: colors.neutral[700],
    marginHorizontal: spacing.xs,
  },
  timeLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
  quickDurationContainer: {
    marginBottom: spacing.lg,
  },
  quickDurationLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[600],
    marginBottom: spacing.xs,
  },
  quickDurationButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  quickDurationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  quickDurationButtonText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary[700],
    marginLeft: spacing.xs,
  },
  categoryPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
  },
  categoryPickerText: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral[900],
  },
  categoryDropdown: {
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  categoryOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  selectedCategoryOption: {
    backgroundColor: colors.primary[50],
  },
  categoryOptionText: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral[800],
  },
  selectedCategoryOptionText: {
    color: colors.primary[700],
    fontWeight: typography.fontWeights.medium as any,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});