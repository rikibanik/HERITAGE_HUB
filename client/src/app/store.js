import { configureStore } from '@reduxjs/toolkit';
import { museumApi } from '../features/museum/museumApi';
import MuseumReducer from '../features/museum/museumSlice';

export default configureStore({
    reducer: {
        [museumApi.reducerPath]: museumApi.reducer,
        museum: MuseumReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(museumApi.middleware),
});