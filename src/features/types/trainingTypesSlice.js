import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    1: {
        id: "pullTraining",
        name: "Pull Training"
    },
    2: {
        id: "pushTraining",
        name: "Push Training"
    },
    3: {
        id: "legsTraining",
        name: "Legs Training"
    }
}

const trainingsSlice = createSlice({
    name: 'trainingTypes',
    initialState,
    reducers: {}
})

export default trainingsSlice.reducer