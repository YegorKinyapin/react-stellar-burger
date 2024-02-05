import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getIngredients } from "../../utils/api";

const initialState = {
    ingredients: [],
    loading: true,
}

export const fetchIngredients = createAsyncThunk(
    'ingredients/getIngredients', 
    async () => {
        const res = await getIngredients();
        return res
});

const ingrSlice = createSlice(
    {
        name: 'app',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
        builder
        .addCase(fetchIngredients.fulfilled.type, (state, action) => {
            state.ingredients = action.payload;
            state.loading = false;
        })
        .addCase(fetchIngredients.pending.type, (state) => {
            state.loading = true;
        });
        },
    }
);

export default ingrSlice.reducer;


