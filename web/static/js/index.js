import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';

const rootEl = document.getElementById('app_root');
const renderApp = (Component = App) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  );
};

if (module.hot) {
  // Not using Redux for now
  // module.hot.accept('./reducer', () => {
  //   store.replaceReducer(appReducer);
  // });

  module.hot.accept('./app', () => renderApp());
}

renderApp(); 