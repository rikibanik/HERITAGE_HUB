import { configureStore } from '@reduxjs/toolkit';
import { museumApi } from '../features/museum/museumApi';
import MuseumReducer from '../features/museum/museumSlice';
import { authApi } from '../features/auth/authApi';
import { dashboardApi } from '../features/dashboard/dashboardApi';

export default configureStore({
    reducer: {
        [museumApi.reducerPath]: museumApi.reducer,
        museum: MuseumReducer,
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(museumApi.middleware, authApi.middleware, dashboardApi.middleware),
});