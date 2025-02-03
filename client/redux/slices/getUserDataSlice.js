import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getUserData = createAsyncThunk(
    'user/getData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST}/user`, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error('Response not ok');
            }
            return response.json();
        } catch (error) {
            return error;
        }
    }
);


const getUserDataSlice = createSlice({
    name: 'userData',
    initialState: {
        loading: true,
        resData: [],
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.loading = false
                state.resData = action.payload;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default getUserDataSlice.reducer
