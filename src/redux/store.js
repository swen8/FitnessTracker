import { configureStore } from '@reduxjs/toolkit'

import trainingsReducer from '../features/trainings/trainingsSlice'

export default configureStore({
    reducer: {
        trainings: trainingsReducer
    }
})