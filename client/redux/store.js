import confirmOrderReducer from '../redux/slices/confirmOrderSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        confirmOrder: confirmOrderReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
})
