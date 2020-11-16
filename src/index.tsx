import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles.scss';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './pages/App';
import { GlobalStyle } from './components/styled/WithStyledApp';
import ScrollToTop from './hooks/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GlobalStyle />
      <Router>
        <Header />
        <App />
        <ScrollToTop />
        <Footer />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
