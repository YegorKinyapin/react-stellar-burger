/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = { ingredients: [], show: false }

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        setOrder: (state, payload) => {
            state.ingredients = { ...payload }
        },
        resetOrder: (state) => {
            state = initialState
        },
        setShowOrder: (state) => {
            const curState = {
                ...state,
            }
            state.show = !curState.show
        },
        resetShowOrder: (state) => (state = initialState),
    },
})

export const { setOrder, resetOrder, setShowOrder, resetShowOrder } = orderDetailsSlice.actions
export const selectShowOrder = (state) => state.orderDetails?.show
export const selectDetailsOrder = (state) => state.orderDetails?.ingredients

export default orderDetailsSlice.reducer
