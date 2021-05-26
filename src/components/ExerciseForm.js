import React, { useState } from 'react'
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { removeExercise } from '../features/add-trainings/addTrainingSlice'
import { colors } from '../utils/colors'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const ExerciseForm = ({exercise, index}) => {
    const [isOpen, setIsOpen] = useState(true)

    const dispatch = useDispatch()

    const onPress= () => {
        setIsOpen(prevState => !prevState)
    }

    const onPressRemoveExercise = () => {
        dispatch(removeExercise(index))
    }

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={[styles.overviewContainer, !isOpen && {borderBottomLeftRadius: 20, borderBottomRightRadius: 20}]}>
                <View style={styles.numberContainer}>
                    <Text style={styles.number}>{index +1}</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{exercise.name}</Text>
                    <Pressable onPress={() => onPressRemoveExercise()}>
                        <EvilIcons name="close" size={32} color={colors.orange} />
                    </Pressable>
                </View>              
            </View>
            

            {isOpen &&
                <View style={styles.detailContainer}>
                    <FlatList 
                        data={exercise.sets}
                        renderItem={({item, index}) => <TextInput style={styles.detailText} value="5" />}
                        keyExtractor={(item, index) => index.toString()} /> 
                </View>
            }
        </Pressable>
    )
}

export default ExerciseForm

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        
    },
    overviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.mediumDark,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    numberContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.orange,
        width: 40,
        height: 40,
        padding: 5,
        marginRight: 10,
        backgroundColor: colors.dark
    },
    number: {
        color: colors.white,
        fontSize: 20       
    },  
    nameContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 15
    },
    name: {
        color: colors.white,
        fontSize: 16
    },
    detailContainer: {
        borderBottomWidth: 0,
        borderBottomColor: colors.orange,
        paddingBottom: 5,
        borderTopWidth: 0,
        borderTopColor: colors.orange,
        paddingTop: 5,
        backgroundColor: colors.mediumDark,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    detailText: {
        color: colors.white,
        marginLeft: 50,
    },
    iconContainer: {
        flexDirection: 'row'
    }
})
