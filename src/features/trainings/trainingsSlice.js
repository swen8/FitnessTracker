import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Parse from 'parse/react-native';

/* const tempTrainingslist = {
    "1" : {
        name: "Push",
        date: '20.05.2021',
        exercises: [
            {
                name:"Push Ups",
                sets: [
                    {
                        reps: 20,
                    },
                    {
                        reps: 20
                    },
                    {
                        reps: 20
                    },
                    {
                        reps: 20
                    }
                ]
            },
            {
                name:"Dips",
                sets: [
                    {
                        reps: 10,
                    },
                    {
                        reps: 10
                    },
                    {
                        reps: 10
                    },
                    {
                        reps: 10
                    }
                ]
            }
        ]
    },
    "2" : {
        name: "Pull",
        date: '22.05.2021',
        exercises: [
            {
                name:"Pull Ups",
                sets: [
                    {
                        reps: 10,
                    },
                    {
                        reps: 10
                    },
                    {
                        reps: 9
                    },
                    {
                        reps: 8
                    }
                ]
            }
        ]
    }
} */

const initialState = {
    data: {},
    status: 'idle',
    error: null
}

export const fetchTrainings = createAsyncThunk('trainings/fetchTrainings', async () => {
    const Training = Parse.Object.extend('Training');
    const query = new Parse.Query(Training);

    query.descending('createdAt')

    const results = await query.find()
    const trainings = {}

    for (let i = 0; i < results.length; i++) {
        const currentTraining = results[i];
        
        const exercises = await getExercises(currentTraining)

        //Add Training
        trainings[currentTraining.id] = {
            id: currentTraining.id,
            name: currentTraining.get('name'),
            date: currentTraining.get('createdAt').toLocaleDateString(),
            dateTime: currentTraining.get('createdAt').toLocaleString(),
            exercises: exercises
        }
    }

    return trainings
})

const getExercises = async (training) => {
    const Exercise = Parse.Object.extend('Exercise')
    const exerciseQuery = new Parse.Query(Exercise)
    exerciseQuery.equalTo('training', training)

    const queriedExercises = await exerciseQuery.find()
    const exercises = []
    queriedExercises.forEach(function(exercise) {
        exercises.push({
            name: exercise.get('name'),
            type: exercise.get('type'),
            sets: exercise.get('sets')
        })
    })

    return exercises
}

const trainingsSlice = createSlice({
    name: 'trainings',
    initialState: initialState,
    reducers: { },
    extraReducers: {
        [fetchTrainings.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchTrainings.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        },
        [fetchTrainings.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export default trainingsSlice.reducer