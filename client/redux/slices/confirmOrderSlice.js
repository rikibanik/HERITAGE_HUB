import { createSlice } from '@reduxjs/toolkit'

const confirmOrderSlice = createSlice({
    name: 'confirmOrder',
    initialState: {
        status: false,
    },
    reducers: {
        setConfirmOrder(state, action) {
            state.status = action.payload;
        }
    }
})

export const { setConfirmOrder } = confirmOrderSlice.actions
export default confirmOrderSlice.reducer
