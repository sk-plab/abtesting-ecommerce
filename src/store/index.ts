import reducers from './modules';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import { persistStore } from 'redux-persist';

const middlewares = [logger];

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
