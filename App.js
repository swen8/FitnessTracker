import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from './src/navigation/Navigation';
import store from './src/redux/store';
import { colors } from './src/utils/colors';

export default function App() {

  return (
      <Provider store={store}>
          <Navigation/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
                                                                                                                                           