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
import { makeServer } from './server';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

makeServer();

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GlobalStyle />
      <Router>
        <Header />
        <ReactQueryCacheProvider queryCache={queryCache}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryCacheProvider>
        <ScrollToTop />
        <Footer />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
