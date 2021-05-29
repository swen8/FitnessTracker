import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from './src/navigation/Navigation';
import store from './src/redux/store';
import { colors } from './src/utils/colors';

//Parse
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

//Before using the SDK...
Parse.setAsyncStorage(AsyncStorage);
//Paste below the Back4App Application ID AND the JavaScript KEY
Parse.initialize('qRaU3QGPcBghVwTo17Ct94GdKkeHGjh4w0ALhcnq', 'AYlsaGfmP8Jc9zJcxVNte3Hj5LF7aK6OUULQ6s6W');
//Point to Back4App Parse API address 
Parse.serverURL = 'https://fitnesstracker.b4a.io/'


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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
                                                                                                                                           