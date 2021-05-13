import React from 'react';
import { RecoilRoot } from 'recoil';
import { AppRegistry } from 'react-native';
import App from './App';
import { name } from './app.json';

function root() {
  return () => (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

AppRegistry.registerComponent(name, root);
