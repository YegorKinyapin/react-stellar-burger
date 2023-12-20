import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './reducers/constructorSlice';
import ingredientsReducer from './reducers/ingrSlice';
import ingredientDetailsReducer from './reducers/ingrDetailsSlice';
import { orderDetailsSlice } from './reducers/orderSlice';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;


