import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '../../test-utils';

import App from '../App';

it('renders without crashing', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  //screen.debug();

  expect(screen.queryByText('추천 상품')).toBeInTheDocument();
  expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
});
