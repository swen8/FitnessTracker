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
    data: [],
    status: 'idle',
    error: null
}


export const addTraining = createAsyncThunk('trainings/addTraining', async (training) => {
    const PTraining = Parse.Object.extend("Training"); 
    const pTraining = new PTraining();
    pTraining.set("name", training.name);
    
    let pTrainingResult
    try {
        pTrainingResult = await pTraining.save()
        //alert('New object created with objectId: ' + result.id);
    } catch(error) {
        alert('Failed to create new training, with error code: ' + error.message);
        return;
    }

    //Exercises   
    const pExercises = []

    for (let i = 0; i < training.exercises.length; i++) { 
        const pExercise = await addNewExercise(pTrainingResult, training.exercises[i], i)
        pExercises.push(pExercise)
    }

    return await getTraining(pTrainingResult, pExercises)
})

const addNewExercise = async (pTraining, exercise, index) => {
    const PExercise = Parse.Object.extend("Exercise");
    const pExercise = new PExercise()
    pExercise.set("number", index)
    pExercise.set("name", exercise.name)
    pExercise.set("type", exercise.type)
    pExercise.set("sets", selectValidSets(exercise.sets, exercise.type))
    pExercise.set("training", pTraining)

    try {
        return await pExercise.save()
        //alert('New object created with objectId: ' + result.id);
    } catch(error) {
        alert('Failed to create new exercise, with error code: ' + error.message);
    }
}

const selectValidSets = (sets, type) => {
    if(type === 'reps') {
        return sets.filter(set => set.reps !== undefined)
    }

    return sets
}

export const fetchTrainings = createAsyncThunk('trainings/fetchTrainings', async () => {
    const Training = Parse.Object.extend('Training');
    const query = new Parse.Query(Training);

    query.descending('createdAt')

    const pTrainings = await query.find()
    const trainings = []

    //Get Exercises
    const Exercise = Parse.Object.extend('Exercise')
    const exerciseQuery = new Parse.Query(Exercise)
    exerciseQuery.containedIn('training', [pTrainings])

    const exerciseResults = await exerciseQuery.find()

    for (let i = 0; i < pTrainings.length; i++) {   
        const training  = await getTraining(pTrainings[i], exerciseResults)     
        trainings.push(training)
    }

    return trainings
})

const getTraining = async (training, exerciseResults) => {
    const exercises = await getExercisesOfTraining(training, exerciseResults)

    //Add Training
    return {
        id: training.id,
        name: training.get('name'),
        date: training.get('createdAt').toLocaleDateString(),
        dateTime: training.get('createdAt').toLocaleString(),
        exercises: exercises
    }
}

const getExercisesOfTraining = async (training, pExercises) => {

    const pExercisesOfTraining = pExercises.filter(exercise => exercise.get('training').id === training.id)

    const exercises = []
    pExercisesOfTraining.forEach(function(exercise) {
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
        },

        [addTraining.fulfilled]: (state, action) => {
            state.data.unshift(action.payload)
        },
    }
})

export default trainingsSlice.reducer