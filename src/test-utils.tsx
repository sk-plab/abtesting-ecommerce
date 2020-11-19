import React, { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Context, IContext } from './store/context';

import { AnyAction, Action, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import { rootReducer } from './store/modules';
import { initialState as _initialState, ShoppingState } from './store/modules/shopping';

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
    store = createStore(rootReducer, { Shopping: initialState }),
  } = {}
) => {
  const defaultValue = {
    abtestCtx: { expKey: '', setExpKey: jest.fn() },
  };

  return render(
    <Context.Provider value={defaultValue}>
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    </Context.Provider>
  );
};

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
