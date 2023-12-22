import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIngredient: null,
};

const ingrDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    openIngr: (state, action) => {
      state.currentIngredient = action.payload;
    },
    clearIng: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const { openIngr, clearIng} = ingrDetailsSlice.actions;
export default ingrDetailsSlice.reducer;