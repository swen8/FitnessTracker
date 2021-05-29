import React, { useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../utils/colors'

const SelectTrainingModal = ({setShowModal, dispatchFunction}) => {
    const [trainingName, setTrainingName] = useState()

    const trainingTypes = useSelector(state => state.trainingTypes)

    const dispatch = useDispatch()

    const onSelect = (key) => {
        dispatch(dispatchFunction(key))
        setShowModal(false)
    }

    const onPressConfirm = () => {
        dispatch(dispatchFunction(trainingName))
        setShowModal(false)
    }

    return (
        <Modal
            transparent={true}
            onRequestClose={() => setShowModal(false)}
        >
            <Pressable style={styles.container} onPress={() => setShowModal(false)}>
                <Pressable style={styles.contentContainer}>

                    <FlatList 
                        data={trainingTypes}
                        renderItem={({item, index}) =>
                        <Pressable style={styles.listContainer} onPress={() => onSelect(item.key)}> 
                            <Text style={styles.trainingTypeText}>{item.name}</Text>
                        </Pressable>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    
                    
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Enter custom name here..." 
                        placeholderTextColor={colors.mediumWhite}
                        value={trainingName}
                        onChangeText={text => setTrainingName(text)}
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

export default SelectTrainingModal

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
    listContainer: {
        flexDirection:'row',
        alignContent: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.mediumWhite,
        marginBottom: 10,
        marginHorizontal: 10,
        paddingVertical: 5
    },
    trainingTypeText: {
        color: colors.white,            
        fontSize: 18,
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.mediumWhite,
        borderRadius: 5,
        padding: 5,
        marginTop: 40,
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
        marginTop: 20,
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
