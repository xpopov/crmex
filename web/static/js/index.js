import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Rerender, Render, ConnectStore } from 'jumpsuit';
import { reducer as formReducer } from 'redux-form';

import App from './app';
import SocketActions from 'socket/socket_actions';
import auth from 'auth/auth_state';

// const rootEl = document.getElementById('app');
const renderApp = (Inner = App) => {
  const globalState = { socket: SocketActions, auth: auth, form: formReducer };
  Render(globalState, <Inner/>, 'app');

  // const connectedApp = ConnectStore(globalState, <Inner />);
  /*render(
    <AppContainer>
      <connectedApp />
    </AppContainer>    
  , rootEl);*/
};

if (module.hot) {
  // Not using Redux for now
  // module.hot.accept('./reducer', () => {
  //   store.replaceReducer(appReducer);
  // });

  module.hot.accept('./app', () => 
    // Rerender()
    renderApp()
  );
}

renderApp(); 