import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TrainingsList from '../features/trainings/TrainingsList';
import AddTrainingForm from '../features/trainings/AddTrainingForm';


const BottomTab = createBottomTabNavigator()

export const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="TrainingsListNavigator" component={TrainingsListNavigator}/>
            <BottomTab.Screen name="AddTrainingFormNavigator" component={AddTrainingFormNavigator}/>
        </BottomTab.Navigator>
    )
}

const TrainingsListStack = createStackNavigator()

const TrainingsListNavigator = () => {
    return (
        <TrainingsListStack.Navigator>
            <TrainingsListStack.Screen name="TrainingsList" component={TrainingsList} />
        </TrainingsListStack.Navigator>
    )
}

const AddTrainingFormStack = createStackNavigator()

const AddTrainingFormNavigator = () => {
    return (
        <AddTrainingFormStack.Navigator>
            <AddTrainingFormStack.Screen name="AddTrainingForm" component={AddTrainingForm} />
        </AddTrainingFormStack.Navigator>
    )
}