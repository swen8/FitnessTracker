import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils/colors'

const ExerciseView = ({exercise, number}) => {
    const [isOpen, setIsOpen] = useState(false)

    const onPress= () => {
        setIsOpen(prevState => !prevState)
    }

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={[styles.overviewContainer, !isOpen && {borderBottomLeftRadius: 20, borderBottomRightRadius: 20}]}>
                <View style={styles.numberContainer}>
                    <Text style={styles.number}>{number}</Text>
                </View>
                <Text style={styles.name}>{exercise.name}</Text>
            </View>
            

            {isOpen &&
                <View style={styles.detailContainer}>
                    <FlatList 
                        data={exercise.sets}
                        renderItem={({item, index}) => <Text style={styles.detailText}>Set {index +1}: {item.reps} Reps</Text>}
                        keyExtractor={(item, index) => index.toString()} /> 
                </View>
            }
        </Pressable>
    )
}

export default ExerciseView

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
    }
})
