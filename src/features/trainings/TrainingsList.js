import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import TrainingListView from '../../components/TrainingListView'
import TrainingView from '../../components/TrainingView'
import { colors } from '../../utils/colors'

const TrainingsList = ({navigation}) => {
    const trainings = useSelector(state => state.trainings)

    

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.keys(trainings)}
                renderItem={({item}) => 
                    <TrainingListView training={trainings[item]} navigation={navigation} />
                }
                keyExtractor={(item) => item}
            />
        </View>
    )
}

export default TrainingsList

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dark,
        flex: 1
    },
    text: {
        color: colors.white,
        fontSize: 20
    }
})

