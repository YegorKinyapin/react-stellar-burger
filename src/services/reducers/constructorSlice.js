import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const initialState = {
  bun: null,
  constructorElement: [],
}

const conctructorSlice = createSlice(
  {
    name: 'constructor',
    initialState,
    reducers: {
      setBun: (state, action) => {
        state.bun = action.payload;
      },
      addIngr: {
        reducer: (state, action) => {
          state.constructorElement.push(action.payload);
        },
        prepare: args => {
          return {
            payload: {
              ...args,
              uuid: uuidv4(),
            }
          };
        },
      },
      swapIngredients: (store, action) => {
        const {indexFrom, indexTo, ingredient} = action.payload;
  
        store.constructorElement.splice(indexFrom, 1);
        store.constructorElement.splice(indexTo, 0, ingredient);
  
      },
      removeIngr: (state, action) => {
        const index = state.constructorElement.findIndex(
          (ingredient) => ingredient.uuid === action.payload.uuid
        );
  
        if (index !== -1) {
          state.constructorElement.splice(index, 1);
        }
      },
      clearBurgerConstructor: (state) => {
        state.bun = null;
        state.constructorElement = [];
      }
    }
  }
);



export const {addIngr, removeIngr, setBun, swapIngredients, clearBurgerConstructor} = conctructorSlice.actions;

export default conctructorSlice.reducer;
