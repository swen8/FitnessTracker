import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    1: {
        id: "pull",
        name: "Pull Training"
    },
    2: {
        id: "push",
        name: "Push Training"
    },
    3: {
        id: "legs",
        name: "Legs Training"
    }
}

const trainingsSlice = createSlice({
    name: 'trainingTypes',
    initialState,
    reducers: {}
})

export default trainingsSlice.reducer