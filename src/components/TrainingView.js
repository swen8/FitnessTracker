import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils/colors'
import ExerciseView from './ExerciseView'

const TrainingView = ({ navigation, route }) => {
    const training = route.params.training

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.name}>{training.name}</Text>
                <Text style={styles.date}>{training.date}</Text>
            </View>
            <View style={styles.contentContainer}>
                <FlatList 
                    data={training.exercises}
                    renderItem={({item, index}) => <ExerciseView exercise={item} number={index +1} />}
                    keyExtractor={(item) => item.name}
                />
            </View>
        </View>
    )
}

export default TrainingView

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
        marginBottom: 10
    },
    date: {
        color: colors.white,
        fontSize: 14
    },
    contentContainer: {
        flex: 1,
        marginTop: 10
    }

})
