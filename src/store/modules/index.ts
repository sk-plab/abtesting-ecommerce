import { combineReducers } from 'redux';
import Shopping from './shopping';

const rootReducer = combineReducers({
  Shopping,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
