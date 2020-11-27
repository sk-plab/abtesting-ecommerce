import { combineReducers } from 'redux';
import Shopping from './shopping';
import cartItemReducer from './cartItemSlice';

export const rootReducer = combineReducers({
  Shopping,
  cartItems: cartItemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
