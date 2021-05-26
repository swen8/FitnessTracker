import { configureStore } from '@reduxjs/toolkit'

import trainingsReducer from '../features/trainings/trainingsSlice'
import trainingTypesReducer from '../features/types/trainingTypesSlice'
import addTrainingReducer from '../features/add-trainings/addTrainingSlice'

export default configureStore({
    reducer: {
        trainings: trainingsReducer,
        trainingTypes: trainingTypesReducer,
        addTraining: addTrainingReducer
    }
})