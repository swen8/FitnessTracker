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
        }
    }
})

export const { setTrainingType, addExercise, removeExercise } = addTrainingSlice.actions

export default addTrainingSlice.reducer