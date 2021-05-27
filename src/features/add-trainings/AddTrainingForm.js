import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { colors } from '../../utils/colors'
import { Ionicons, EvilIcons } from '@expo/vector-icons';


import { addExercise, setTrainingType, logTraining } from './addTrainingSlice'
import ExerciseForm from '../../components/ExerciseForm'
import SelectModal from '../../components/SelectModal'

export default function AddTrainingForm() {

    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)

    const trainingTypes = useSelector(state => state.trainingTypes)
    const training = useSelector(state => state.addTraining)
    const hasSelectedTrainingType = training.name !== undefined
    const exercises = useSelector(state => state.addTraining.exercises)

    const dispatch = useDispatch()


    const getFormattedDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return dd + '.' + mm + '.' + yyyy;
    }

    const onChange = (option) => {
        if(option !== undefined){
            dispatch(setTrainingType(trainingTypes[option].id))
        }
        
    }

    const onPressAddExercise = () => {
        setShowAddExerciseModal(true)
    }

    const onPressFinishTraining = () => {

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
                    selectedKey={training.name}
                    selectTextStyle={styles.name}
                />
                <Text style={styles.date}>{getFormattedDate()}</Text>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={exercises}
                    renderItem={({item, index}) => <ExerciseForm exercise={item} exerciseIndex={index} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.dummyView}></View>
                <Pressable disabled={!hasSelectedTrainingType} onPress={onPressAddExercise}>
                    <Ionicons name="add-circle" size={48} color={hasSelectedTrainingType ? colors.orange : colors.mediumDark} />
                </Pressable>
                <Pressable onPress={() => {dispatch(logTraining())}}>
                    <Ionicons name="checkmark-circle" size={48} color={hasSelectedTrainingType ? colors.orange : colors.mediumDark} />
                </Pressable>
            </View>
            {showAddExerciseModal &&
                <SelectModal setShowModal={setShowAddExerciseModal} dispatchFunction={addExercise} text="Exercise Name"/>
            }
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
