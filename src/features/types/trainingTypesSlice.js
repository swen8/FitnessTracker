import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {
        key: "pullTraining",
        name: "Pull Training"
    },
    {
        key: "pushTraining",
        name: "Push Training"
    },
    {
        key: "legsTraining",
        name: "Legs Training"
    }
]

const trainingsSlice = createSlice({
    name: 'trainingTypes',
    initialState,
    reducers: {}
})

export default trainingsSlice.reducer