import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../../store';
import App from '../App';

beforeAll(() => {
  // Error: <Media targetWindow> does not support `matchMedia`
  // @see https://github.com/ReactTraining/react-media/issues/86
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
});

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  //screen.debug();

  expect(screen.queryByText('추천 상품')).toBeInTheDocument();
  expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
});
