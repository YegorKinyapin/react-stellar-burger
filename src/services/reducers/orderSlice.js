/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getOrderNumber } from '../../utils/api';
import { useState } from 'react';


const initialState = { ingredients: [], show: false, loading: true,}


// export const sendOrder = createAsyncThunk(
//     'orders/sendOrder',
//     async ({orderData, setMessage}, thunkAPI) => {
//       thunkAPI.dispatch(setMessage('Приступили к работе ...'));
//       const response = await getOrderNumber(orderData);
//       if (response.ok) {
//           thunkAPI.dispatch(setMessage('Ваш заказ начали готовить...'));
//       } else {
//           thunkAPI.dispatch(setMessage(`ошибка - ${response.error}`));
//       }
//       return response;
//     }
//  );

    
// export const sendOrder = createAsyncThunk(
//     'orders/sendOrder',
//     async ({orderData, setMessage}, thunkAPI) => {
//       const response = await getOrderNumber(orderData);
      
//       return response;
//     }
//  );

 export const sendOrder = createAsyncThunk("orders/sendOrder", getOrderNumber);
 

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
            state.loading = false;
          })
       },
})

export const { setOrder, resetOrder, setShowOrder, resetShowOrder, updateMessage } = orderDetailsSlice.actions
export const selectShowOrder = (state) => state.orderDetails?.show
export const selectDetailsOrder = (state) => state.orderDetails?.ingredients

export default orderDetailsSlice.reducer
