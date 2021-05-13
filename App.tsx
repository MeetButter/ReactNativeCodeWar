/* eslint-disable prettier/prettier */
import React, {FunctionComponent} from 'react';
import { Provider } from 'react-redux';
import Main from './components/MainApp';
import { store } from './redux';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Main />
   </Provider>
  );
};

export default App;
