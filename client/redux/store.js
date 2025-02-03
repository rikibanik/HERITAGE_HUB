import confirmOrderReducer from '../redux/slices/confirmOrderSlice'
import getUserDataReducer from './slices/getUserDataSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        confirmOrder: confirmOrderReducer,
        getUserData: getUserDataReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
})
