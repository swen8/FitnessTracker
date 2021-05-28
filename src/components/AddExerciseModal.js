import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { colors } from '../utils/colors'

const AddExerciseModal = ({setShowModal, dispatchFunction, text}) => {
    const [exerciseName, setExerciseName] = useState()
    const [exerciseType, setExerciseType] = useState("reps")
    
    const dispatch = useDispatch()

    const hasExerciseName = exerciseName !== undefined && exerciseName.length > 0

    const onPressConfirm = () => {
        if(exerciseName !== undefined && exerciseName.length > 0) {
            dispatch(dispatchFunction({name: exerciseName, type: exerciseType}))
            setShowModal(false)
        }
        else {
            alert("Please select a exercise name.")
        }
    }

    return (
        <Modal
            transparent={true}
            onRequestClose={() => setShowModal(false)}
        >
            <Pressable style={styles.container} onPress={() => setShowModal(false)}>
                <Pressable style={styles.contentContainer}>
                    <Text style={styles.text}>{text}</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Enter name here..." 
                        placeholderTextColor={colors.mediumWhite}
                        value={exerciseName}
                        onChangeText={text => setExerciseName(text)}
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable onPress={onPressConfirm} style={[styles.button, styles.confirmButton]}>
                            <Text style={styles.confirmButtonText}>OK</Text>
                        </Pressable>
                        <Pressable onPress={() => setShowModal(false)} style={[styles.button, styles.cancelButton]}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>
                    </View>               
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default AddExerciseModal

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    contentContainer: {
        borderWidth: 1,
        borderColor: colors.mediumDark,
        borderRadius: 10,
        width: '90%',
        backgroundColor: colors.mediumDark,
        paddingVertical: 40,
        paddingHorizontal: 30
    },
    text: {
        fontSize: 18,
        color: colors.white
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.mediumWhite,
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
        backgroundColor: colors.dark,
        color: colors.white
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    button: {
        borderWidth: 1,
        borderColor: colors.mediumDark,
        borderRadius: 5,
        padding: 10,
        width: '45%',
        marginTop: 40,
        display: 'flex',
        alignItems: 'center'
    },
    confirmButton: {
        backgroundColor: colors.orange
    },
    cancelButton: {
        backgroundColor: colors.dark
    },
    confirmButtonText: {
        color: colors.white
    },
    cancelButtonText: {
        color: colors.white
    }
})
