import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TrainingsList from '../features/trainings/TrainingsList';
import AddTrainingForm from '../features/add-trainings/AddTrainingForm';
import TrainingView from '../components/TrainingView';
import { colors } from '../utils/colors';


const BottomTab = createBottomTabNavigator()

export const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator 
            tabBarOptions= {{
                activeTintColor: colors.white,
                inactiveTintColor: colors.white,
                activeBackgroundColor: colors.dark,
                inactiveBackgroundColor: colors.dark,
                style: {
                    backgroundColor: colors.dark,
              }
            }}
        >
            <BottomTab.Screen name="TrainingsListNavigator" component={TrainingsListNavigator}/>
            <BottomTab.Screen name="AddTrainingFormNavigator" component={AddTrainingFormNavigator} />
        </BottomTab.Navigator>
    )
}

const TrainingsListStack = createStackNavigator()

const TrainingsListNavigator = () => {
    return (
        <TrainingsListStack.Navigator>
            <TrainingsListStack.Screen name="TrainingsList" component={TrainingsList} options={{
                title: "Trainingsliste",
                headerStyle: {
                    backgroundColor: colors.dark,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.orange
                },
                headerTintColor: colors.white
            }}/>
            <TrainingsListStack.Screen name="TrainingView" component={TrainingView} options={{headerShown: false}}/>
        </TrainingsListStack.Navigator>
    )
}

const AddTrainingFormStack = createStackNavigator()

const AddTrainingFormNavigator = () => {
    return (
        <AddTrainingFormStack.Navigator>
            <AddTrainingFormStack.Screen name="AddTrainingForm" component={AddTrainingForm} options={{headerShown: false}}/>
        </AddTrainingFormStack.Navigator>
    )
}