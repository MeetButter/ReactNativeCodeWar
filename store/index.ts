import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import heartsReducer from './reducer';

const store = createStore(
  heartsReducer,
  { hearts: [] },
  applyMiddleware(thunk)
);

export default store;
