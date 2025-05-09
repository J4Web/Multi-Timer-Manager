import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { TimerProvider } from '@/context/TimerContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <TimerProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </TimerProvider>
    </ThemeProvider>
  );
}