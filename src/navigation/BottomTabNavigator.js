import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { NewTrainingScreen } from '../screens/NewTrainingScreen';


const BottomTab = createBottomTabNavigator()

export const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="HomeNavigator" component={HomeNavigator}/>
            <BottomTab.Screen name="NewTrainingNavigator" component={NewTrainingNavigator}/>
        </BottomTab.Navigator>
    )
}

const HomeStack = createStackNavigator()

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        </HomeStack.Navigator>
    )
}

const NewTrainingStack = createStackNavigator()

const NewTrainingNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="NewTrainingScreen" component={NewTrainingScreen} />
        </HomeStack.Navigator>
    )
}