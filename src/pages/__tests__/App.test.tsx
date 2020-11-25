import { waitFor } from '@testing-library/react';
import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '../../test-utils';
import App from '../App';

it('renders without crashing', async () => {
  const route = '/';
  const history = createMemoryHistory({ initialEntries: [route] });
  render(
    <Router history={history}>
      <Suspense fallback={<div>loading.</div>}>
        <App />
      </Suspense>
    </Router>
  );

  await waitFor(() => {
    //screen.debug();
    expect(screen.queryByText('추천 상품')).toBeInTheDocument();
  });
});
