import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './modules';

import ReduxThunk from 'redux-thunk';

import { persistStore } from 'redux-persist';

let middlewares;
if (['development'].includes(process.env.NODE_ENV)) {
  middlewares = [ReduxThunk];
} else {
  middlewares = [ReduxThunk];
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);
//persistor.purge();
