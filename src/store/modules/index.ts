import { combineReducers } from 'redux';
import cartItemReducer from './cartItemSlice';

export const rootReducer = combineReducers({
  cartItems: cartItemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
