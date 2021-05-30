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


export const addTraining = createAsyncThunk('trainings/addTraining', async (trainingData) => {
    const Training = Parse.Object.extend("Training");
    
    const training = new Training();
    training.set("name", trainingData.name);
    
    let trainingResult
    try {
        trainingResult = await training.save()
        //alert('New object created with objectId: ' + result.id);
    } catch(error) {
        alert('Failed to create new training, with error code: ' + error.message);
        return;
    }

    //Exercises
    const Exercise = Parse.Object.extend("Exercise");

    for (let i = 0; i < trainingData.exercises.length; i++) { 
        const exerciseData = trainingData.exercises[i]

        await addNewExercise(Exercise, trainingResult, exerciseData, i)
    }

    return await getTraining(trainingResult)
})

const addNewExercise = async (Exercise, trainingResult, exerciseData, index) => {
    const exercise = new Exercise()
    exercise.set("number", index)
    exercise.set("name", exerciseData.name)
    exercise.set("type", exerciseData.type)
    exercise.set("sets", selectValidSets(exerciseData.sets, exerciseData.type))
    exercise.set("training", trainingResult)

    console.log(`save exercise: ${exerciseData.name}`)
    try {
        let exerciseResult = await exercise.save()
        console.log(exerciseResult.id)
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

    const results = await query.find()
    const trainings = []

    for (let i = 0; i < results.length; i++) {   
        const training  = await getTraining(results[i])     
        trainings.push(training)
    }

    return trainings
})

const getTraining = async (training) => {
    const exercises = await fetchExercises(training)

    //Add Training
    return {
        id: training.id,
        name: training.get('name'),
        date: training.get('createdAt').toLocaleDateString(),
        dateTime: training.get('createdAt').toLocaleString(),
        exercises: exercises
    }
}

const fetchExercises = async (training) => {
    const Exercise = Parse.Object.extend('Exercise')
    const exerciseQuery = new Parse.Query(Exercise)
    exerciseQuery.containedIn('training', [training])

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
        },

        [addTraining.fulfilled]: (state, action) => {
            state.data.unshift(action.payload)
        },
    }
})

export default trainingsSlice.reducer