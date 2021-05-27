import { createSlice } from "@reduxjs/toolkit";


const addTrainingSlice = createSlice({
    name: "addTraining",
    initialState: {
        name: undefined,
        exercises: []
    },
    reducers: {
        setTrainingType: (state, action) => {
            state.name = action.payload
        },
        addExercise: (state, action) => {
            state.exercises.push({ name: action.payload, sets:[{}] })
        },
        removeExercise: (state, action) => {
            state.exercises.splice(action.payload, 1)
        },
        addSet: (state, action) => {
            state.exercises[action.payload].sets.push({})
        },
        logTraining: (state, action) => {
            console.log(state) 
        },
        editSet: (state, action) => {
            const {exerciseIndex, setIndex, name, value} = action.payload
            const set = state.exercises[exerciseIndex].sets[setIndex]

            set[name] = value
        }
    }
})

export const { setTrainingType, addExercise, removeExercise, addSet, logTraining, editSet } = addTrainingSlice.actions

export default addTrainingSlice.reducer