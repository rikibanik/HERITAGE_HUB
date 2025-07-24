import { configureStore } from '@reduxjs/toolkit';
import {authorApi} from '../../../author/src/components/authorApi';

export default configureStore({
    reducer: {
        [authorApi.reducerPath]: authorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authorApi.middleware),
});