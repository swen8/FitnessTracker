import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { colors } from '../../utils/colors'
import { Ionicons } from '@expo/vector-icons';


import { addExercise, setTrainingType, logTraining, resetTraining } from './addTrainingSlice'
import ExerciseForm from '../../components/ExerciseForm'
import AddExerciseModal from '../../components/AddExerciseModal'
import { addNewTraining } from '../../parse-api/parseapi'
import SelectTrainingModal from '../../components/SelectTrainingModal'

export default function AddTrainingForm({navigation}) {

    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
    const [showSelectTrainingModal, setShowSelectTrainingModal] = useState(false)

    const trainingTypes = useSelector(state => state.trainingTypes)
    const training = useSelector(state => state.addTraining)
    const hasSelectedTrainingType = training.name !== undefined
    const exercises = useSelector(state => state.addTraining.exercises)
    const hasExercise = exercises.length > 0
    const trainingName = trainingTypes.find(element => element.key === training.name)?.name ?? training.name


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
        addNewTraining(training)
        dispatch(resetTraining())
        navigation.navigate("TrainingsList")
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => setShowSelectTrainingModal(true)}>
                    <Text style={styles.name}>{hasSelectedTrainingType ? trainingName : "Select training type.."}</Text>
                </Pressable>
                <Text style={styles.date}>{getFormattedDate()}</Text>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={exercises}
                    renderItem={({item, index}) => <ExerciseForm exercise={item} exerciseIndex={index} />}
                    keyExtractor={(item, index) => index.toString()}
                    removeClippedSubviews={false}
                />
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.dummyView}></View>
                <Pressable disabled={!hasSelectedTrainingType} onPress={onPressAddExercise}>
                    <Ionicons name="add-circle" size={48} color={hasSelectedTrainingType ? colors.orange : colors.mediumDark} />
                </Pressable>
                <Pressable disabled={!hasExercise} onPress={onPressFinishTraining}>
                    <Ionicons name="checkmark-circle" size={48} color={hasExercise ? colors.orange : colors.mediumDark} />
                </Pressable>
            </View>
            {showAddExerciseModal &&
                <AddExerciseModal setShowModal={setShowAddExerciseModal} dispatchFunction={addExercise} text="Exercise Name"/>
            }
            {showSelectTrainingModal &&
                <SelectTrainingModal setShowModal={setShowSelectTrainingModal} dispatchFunction={setTrainingType} text="Training Name"/>
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
        fontSize : 20,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 5,
        padding: 5
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
        marginLeft: 10,
        
    },
    dummyView: {
        width: 48
    }
})
