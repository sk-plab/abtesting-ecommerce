import { combineReducers } from 'redux';
import Shopping from './shopping';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['Shopping'],
};

export const rootReducer = combineReducers({
  Shopping,
});

//export default rootReducer;
export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

// selector
export const productsSelector = (state: RootState): ProductType[] => state.Shopping.products;
export const cartSelector = (state: RootState): ProductType[] => state.Shopping.cart;
