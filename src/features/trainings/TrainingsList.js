import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import TrainingListView from '../../components/TrainingListView'
import { colors } from '../../utils/colors'
import { fetchTrainings } from './trainingsSlice'

const TrainingsList = ({navigation}) => {
    const trainings = useSelector(state => state.trainings.data)
    const trainingStatus = useSelector(state => state.trainings.status)

    const dispatch = useDispatch()

    useEffect(() => {
        if (trainingStatus === 'idle') {
          dispatch(fetchTrainings())
        }
    }, [trainingStatus, dispatch])

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

