import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils/colors'

const TrainingListView = ({training, navigation}) => {

    const onPress = () => {
        navigation.navigate('TrainingView', {training: training})
    }

    const exerciseNumber = training.exercises.length

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View>
                <Text style={styles.name}>{training.name}</Text>                
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.exerciseNumber}>{exerciseNumber} {exerciseNumber !== 1 ? "Exercises": "Exercise"}</Text>
                <Text style={styles.date}>{training.date}</Text>
            </View>
        </Pressable>
    )
}

export default TrainingListView

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: colors.mediumDark,
        borderRadius: 10,
        padding: 10
    },
    name: {
        color: colors.white,
        fontSize : 20
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseNumber: {
        color: colors.white,
    },
    date: {
        color: colors.white,
    }
})
