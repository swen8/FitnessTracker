import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '../utils/colors'
import { Feather } from '@expo/vector-icons';

import { addSet, editSet } from '../features/add-trainings/addTrainingSlice'
import { useDispatch, useSelector } from 'react-redux';

const SetForm = ({index, exerciseIndex}) => {

    const isLastSet = useSelector(state => state.addTraining.exercises[exerciseIndex].sets.length === index +1)
    //const reps = useSelector(state => state.addTraining.exercises[exerciseIndex].sets[index].reps)
    //const weight = useSelector(state => state.addTraining.exercises[exerciseIndex].sets[index].weight)
    const set = useSelector(state => state.addTraining.exercises[exerciseIndex].sets[index])
    const dispatch = useDispatch()


    const onPressAddSet = () => {
        dispatch(addSet(exerciseIndex))
    }

    const onPressEditSet = (name, value) => {
        const payload = {
            exerciseIndex: exerciseIndex,
            setIndex: index,
            name,
            value
        }
        dispatch(editSet(payload))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Set {index +1}:</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder="Reps" 
                placeholderTextColor={colors.mediumWhite}
                keyboardType='numeric'
                value={set.reps}
                onChangeText={text => onPressEditSet("reps", text)}
            />
            <TextInput 
                style={styles.textInput} 
                placeholder="Weight" 
                placeholderTextColor={colors.mediumWhite}
                keyboardType='numeric'
                value={set.weight}
                onChangeText={text => onPressEditSet("weight", text)}
            />

            {isLastSet &&
                <Pressable style={styles.iconContainer} onPress={onPressAddSet}>
                    <Feather name="plus" size={24} color={colors.orange} />
                </Pressable>
            }
        </View>
    )
}

export default SetForm

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        marginLeft: 50,
        marginRight: 50,
        justifyContent:'flex-start',
        alignItems: 'center'
    },
    text: {
        color: colors.white,
        fontSize: 14
    },
    textInput: {
        color: colors.white,
        borderWidth: 1,
        borderColor: colors.white,
        marginLeft: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        marginBottom: 3
    },
    iconContainer: {
        marginLeft: 10
    }
})
