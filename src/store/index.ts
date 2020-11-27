import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './modules';

import thunk from 'redux-thunk';
import * as api from '../api';

import { persistStore } from 'redux-persist';
import API from 'API';

const middlewares = [thunk.withExtraArgument<API>(api)];

if (['development'].includes(process.env.NODE_ENV)) {
} else {
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);
//persistor.purge();
