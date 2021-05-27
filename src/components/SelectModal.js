import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { colors } from '../utils/colors'

const SelectModal = ({setShowModal, dispatchFunction, text}) => {
    const [exerciseName, setExerciseName] = useState()
    
    const dispatch = useDispatch()

    const onPressConfirm = () => {
        dispatch(dispatchFunction(exerciseName))
        setShowModal(false)
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.contentContainer}>
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
                </View>
            </View>
        </Modal>
    )
}

export default SelectModal

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    contentContainer: {
        borderWidth: 1,
        borderColor: colors.orange,
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
