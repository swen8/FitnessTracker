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

    const results = await query.find()
    const trainings = {}

    results.forEach(function(trainingData) {
        trainings[trainingData.id] = {
            name: trainingData.get('name'),
            date: trainingData.get('createdAt').toLocaleString(),
            exercises: []
        }
    })

    return trainings
})

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

            console.log(action.payload)
        },
        [fetchTrainings.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export default trainingsSlice.reducer