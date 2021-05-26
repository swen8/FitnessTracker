import { createSlice } from "@reduxjs/toolkit";

const tempTrainingslist = {
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
}

const trainingsSlice = createSlice({
    name: 'trainings',
    initialState: tempTrainingslist,
    reducers: { }
})

export default trainingsSlice.reducer