// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducers from './store/modules';
import { createStore } from 'redux';
import App from './components/App';
import { composeWithDevTools } from 'redux-devtools-extension';
import ABTest from './libs/abtest';

// a/b testing init.
ABTest.init();

const store = createStore(reducers, composeWithDevTools());

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
);
