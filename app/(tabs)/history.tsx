import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Share,
} from 'react-native';
import { spacing, typography } from '@/constants/theme';
import { useTimerContext } from '@/context/TimerContext';
import { useTheme } from '@/context/ThemeContext';
import HistoryItem from '@/components/History/HistoryItem';
import Button from '@/components/UI/Button';
import { Download } from 'lucide-react-native';

export default function HistoryScreen() {
  const { state } = useTimerContext();
  const { colors } = useTheme();
  
  // Get sorted timer logs (newest first)
  const sortedLogs = [...state.timerLogs].sort((a, b) => b.completedAt - a.completedAt);
  
  // Group logs by day
  const groupedLogs: Record<string, typeof sortedLogs> = {};
  
  sortedLogs.forEach((log) => {
    const date = new Date(log.completedAt);
    const dateString = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    if (!groupedLogs[dateString]) {
      groupedLogs[dateString] = [];
    }
    
    groupedLogs[dateString].push(log);
  });

  const handleExport = async () => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        timerLogs: state.timerLogs,
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      
      await Share.share({
        title: 'Timer History Export',
        message: jsonString,
      });
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.neutral[50] }]}>
      <View style={[styles.header, { backgroundColor: colors.white, borderBottomColor: colors.neutral[200] }]}>
        <Text style={[styles.title, { color: colors.neutral[900] }]}>Timer History</Text>
        <Text style={[styles.subtitle, { color: colors.neutral[600] }]}>
          {state.timerLogs.length} completed timer{state.timerLogs.length !== 1 ? 's' : ''}
        </Text>
      </View>
      
      {state.timerLogs.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateTitle, { color: colors.neutral[800] }]}>
            No completed timers yet
          </Text>
          <Text style={[styles.emptyStateText, { color: colors.neutral[600] }]}>
            Complete a timer to see it in your history.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.exportContainer}>
            <Button
              title="Export History"
              onPress={handleExport}
              variant="outline"
              leftIcon={<Download size={20} color={colors.primary[500]} />}
            />
          </View>
          
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            {Object.entries(groupedLogs).map(([date, logs]) => (
              <View key={date} style={styles.dateGroup}>
                <Text style={[styles.dateHeader, { color: colors.neutral[800] }]}>
                  {date}
                </Text>
                
                {logs.map((log) => (
                  <HistoryItem
                    key={log.id}
                    name={log.name}
                    category={log.category}
                    duration={log.duration}
                    completedAt={log.completedAt}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === 'ios' ? spacing.lg : spacing['2xl'],
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold as any,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    marginTop: spacing.xs,
  },
  exportContainer: {
    padding: spacing.md,
    alignItems: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: spacing.md,
    paddingBottom: spacing['3xl'],
  },
  dateGroup: {
    marginBottom: spacing.lg,
  },
  dateHeader: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold as any,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
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
    marginBottom: spacing.md,
  },
  emptyStateText: {
    fontSize: typography.fontSizes.md,
    textAlign: 'center',
    lineHeight: 24,
  },
});