import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';

import { GameProvider, useGame } from './src/context/GameContext';
import AppTabs from './src/navigation/AppTabs';
import { darkTheme, lightTheme } from './src/theme/theme';

function AppContent() {
  const { themeMode } = useGame();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </GestureHandlerRootView>
  );
}
