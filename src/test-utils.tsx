import React, { ReactNode } from 'react';
import { Router, Route } from 'react-router-dom';
import { Context } from './store/context';
import { AnyAction, Action, createStore, Store, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import { rootReducer } from './store/modules';
import { initialState as _initialState, ShoppingState } from './store/modules/shopping';
import { createMemoryHistory, MemoryHistory } from 'history';
import ReduxThunk from 'redux-thunk';
import * as api from './api';

interface RenderWithRedux<S = ShoppingState, A extends Action = AnyAction> {
  (
    ui: ReactNode,
    reduxOptions?: {
      store?: Store<S, A>;
      initialState?: S;
    }
  ): RenderResult;
}
const customRender: RenderWithRedux = (
  ui,
  {
    initialState = _initialState,
    store = createStore(
      rootReducer,
      {
        Shopping: initialState,
      },
      compose(applyMiddleware(ReduxThunk.withExtraArgument(api)))
    ),
  } = {}
) => {
  const defaultValue = {
    abtestCtx: { expKey: '', setExpKey: jest.fn() },
  };

  return render(
    <Context.Provider value={defaultValue}>
      <Provider store={store}>{ui}</Provider>
    </Context.Provider>
  );
};

// Helper function
interface IRenderWithRouter {
  path?: string;
  route?: string;
  history?: MemoryHistory;
}
export function renderWithRouter(
  ui: ReactNode,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: IRenderWithRouter = {}
): RenderResult {
  return {
    ...render(
      <Router history={history}>
        <Route path={path}>{ui}</Route>
      </Router>
    ),
  };
}

export * from '@testing-library/react';
export { customRender as render };

// Error: <Media targetWindow> does not support `matchMedia`
// @see https://github.com/ReactTraining/react-media/issues/86
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: () => console.log,
      removeListener: () => console.log,
    };
  };
