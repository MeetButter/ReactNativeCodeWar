import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import heartsReducer from './reducer';

const store = createStore(
  heartsReducer,
  { hearts: [] },
  applyMiddleware(thunk)
);
export type RootState = ReturnType<typeof store.getState>;

export default store;
