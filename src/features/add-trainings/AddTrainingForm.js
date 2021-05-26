import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../../utils/colors'
import { Ionicons, EvilIcons } from '@expo/vector-icons';


import { addExercise, setTrainingType } from './addTrainingSlice'
import ExerciseForm from '../../components/ExerciseForm'

export default function AddTrainingForm() {

    const trainingTypes = useSelector(state => state.trainingTypes)
    const selectedTrainingType = useSelector(state => state.addTraining.name)
    const hasSelectedTrainingType = selectedTrainingType !== undefined
    const exercises = useSelector(state => state.addTraining.exercises)

    const dispatch = useDispatch()

    console.log(exercises)

    const getFormattedDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return dd + '.' + mm + '.' + yyyy;
    }

    const onChange = (option) => {
        if(option !== undefined){
            if(selectedTrainingType !== null){ 
                //TODO: Check change 
                dispatch(setTrainingType(trainingTypes[option].id))
            }
            else {
                dispatch(setTrainingType(trainingTypes[option].id))
            }
        }
        
    }

    const onPressAddExercise = () => {
        dispatch(addExercise("Test Exercise"))

    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ModalSelector 
                    data={Object.keys(trainingTypes)}
                    keyExtractor={item => trainingTypes[item].id}
                    labelExtractor={item => trainingTypes[item].name}
                    initValue= "Select Training Type"
                    onChange={(option)=> onChange(option)}
                    selectedKey={selectedTrainingType}
                    selectTextStyle={styles.name}
                />
                <Text style={styles.date}>{getFormattedDate()}</Text>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={exercises}
                    renderItem={({item, index}) => <ExerciseForm exercise={item} index={index} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.dummyView}></View>
                <Pressable disabled={!hasSelectedTrainingType} onPress={onPressAddExercise}>
                    <Ionicons name="add-circle" size={48} color={hasSelectedTrainingType ? colors.orange : colors.mediumDark} />
                </Pressable>
                <Pressable>
                    <Ionicons name="checkmark-circle" size={48} color={hasSelectedTrainingType ? colors.orange : colors.mediumDark} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: colors.dark,
        flex: 1,
        padding: 10,
    },
    headerContainer: {
        flexDirection: "column",
        alignItems: 'center',
        borderTopColor: colors.orange,
        borderTopWidth: 1,
        borderBottomColor: colors.orange,
        borderBottomWidth: 1,
        marginTop: 20,
        padding: 10,
        backgroundColor: colors.dark
    },  
    name: {
        color: colors.white,
        fontSize : 24,
    },
    date: {
        color: colors.white,
        fontSize: 14,
        marginTop: 10
    },
    contentContainer: {
        flex: 1,
        marginTop: 10
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
        marginLeft: 10
    },
    dummyView: {
        width: 48
    }
})
