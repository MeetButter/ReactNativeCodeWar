import React from 'react';
import { Provider } from 'react-redux';
import Main from './components/Main';
import { store } from './redux';
const App = () => {
    return (React.createElement(Provider, { store: store },
        React.createElement(Main, null)));
};
export default App;