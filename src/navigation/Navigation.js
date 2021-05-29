import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { colors } from '../utils/colors';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.dark
    }
}

export const Navigation = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createStackNavigator()

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
    )
}