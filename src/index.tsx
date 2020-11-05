// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles.scss';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './pages/App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
