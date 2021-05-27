import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: undefined,
    exercises: []
}

const addTrainingSlice = createSlice({
    name: "addTraining",
    initialState: initialState,
    reducers: {
        setTrainingType: (state, action) => {
            state.name = action.payload
        },
        addExercise: (state, action) => {
            const {name, type} = action.payload
            state.exercises.push({ name: name, type: type, sets:[{}] })
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
        },
        resetTraining: (state) => {
            state = initialState
        }
    }
})

export const { setTrainingType, addExercise, removeExercise, addSet, logTraining, editSet, resetTraining } = addTrainingSlice.actions

export default addTrainingSlice.reducer