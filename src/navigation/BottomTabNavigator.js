import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TrainingsList from '../features/trainings/TrainingsList';
import AddTrainingForm from '../features/add-trainings/AddTrainingForm';
import TrainingView from '../components/TrainingView';
import { colors } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchTrainings } from '../features/trainings/trainingsSlice';


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
                },
                showLabel: false,
                
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    const iconColor = focused ? colors.orange : colors.mediumWhite

                    if (route.name === 'TrainingsListNavigator') {
                        iconName = focused ? 'list' : 'list-outline';                       
                    } else if (route.name === 'AddTrainingFormNavigator') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }

                    return <Ionicons name={iconName} size={32} color={iconColor} />
                },
            })}
        >
            <BottomTab.Screen name="TrainingsListNavigator" component={TrainingsListNavigator}/>
            <BottomTab.Screen name="AddTrainingFormNavigator" component={AddTrainingFormNavigator} />
        </BottomTab.Navigator>
    )
}

const TrainingsListStack = createStackNavigator()

const TrainingsListNavigator = () => {

    const dispatch = useDispatch()

    return (
        <TrainingsListStack.Navigator >
            <TrainingsListStack.Screen 
                name="TrainingsList" 
                component={TrainingsList} 
                options={{
                    title: "Trainings",
                    headerStyle: {
                        backgroundColor: colors.dark,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.orange
                    },
                    headerTintColor: colors.white,
                    animationEnabled: false,
                    headerRight: () => (
                        <Pressable style={{marginRight: 10}} onPress={() => dispatch(fetchTrainings())}>
                            <Ionicons name='refresh' size={32} color={colors.white} />
                        </Pressable>
                    )
                }}
            />
            <TrainingsListStack.Screen 
                name="TrainingView" 
                component={TrainingView} 
                options={{
                    headerShown: false,
                    
                }}/>
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