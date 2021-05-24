import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils/colors'

const TrainingListView = ({training, navigation}) => {

    const handlePress = () => {
        navigation.navigate('TrainingView', {training: training})
    }

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <Text style={styles.text}>{training.name}</Text>
        </Pressable>
    )
}

export default TrainingListView

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
    },
    text: {
        color: colors.white,
        fontSize : 20
    }
})
