import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './reducers/constructorSlice';
import ingredientsReducer from './reducers/ingrSlice';
import ingredientDetailsReducer from './reducers/ingrDetailsSlice';
import { orderDetailsSlice } from './reducers/orderSlice';
import userReducer from './reducers/userReducer';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsSlice.reducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;


