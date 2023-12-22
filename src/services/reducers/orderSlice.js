/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getOrderNumber } from '../../utils/api';

const initialState = { ingredients: [], show: false, loading: true, }


export const sendOrder = createAsyncThunk(
    'orders/sendOrder',
    async (orderData) => {
      const response = await getOrderNumber(orderData);
      return response;
    }
   );

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
    extraReducers: (builder) => {
        builder
          .addCase(sendOrder.pending, (state) => {
            state.loading = true;
          })
          .addCase(sendOrder.fulfilled, (state, action) => {
            state.orderNumber = action.payload;
          })
       },
})

export const { setOrder, resetOrder, setShowOrder, resetShowOrder } = orderDetailsSlice.actions
export const selectShowOrder = (state) => state.orderDetails?.show
export const selectDetailsOrder = (state) => state.orderDetails?.ingredients

export default orderDetailsSlice.reducer
