import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './modules';

import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import { persistStore } from 'redux-persist';

const middlewares = [logger, ReduxThunk];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);
//persistor.purge();
