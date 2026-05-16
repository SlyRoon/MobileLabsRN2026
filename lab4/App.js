import React from 'react';
import { StatusBar } from 'expo-status-bar';

import FileManagerScreen from './src/screens/FileManagerScreen';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <FileManagerScreen />
    </>
  );
}
