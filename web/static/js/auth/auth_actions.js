import { Socket } from 'phoenix';
import { getState, Actions, Hook, State } from 'jumpsuit';
import cookie from 'react-cookie';

import state, { selectors } from './auth_state';


export function signin(userData, onLoginSuccess, onLoginError) {
  console.log('signin');

  const channel = getState().socket.channels.auth;
  channel
    .push("signin", userData)
    .receive("ok", (msg) => {
      console.log("Signin ok");
      console.log(msg);
      if (undefined != msg.token) {
        cookie.save('userToken', msg.token, { path: '/' });
        state.setToken(msg.token);
        onLoginSuccess();
      }
    })
    .receive("error", (msg) => {
      console.log("Signin error");
      console.log(msg);
      onLoginError(msg.errors.error);
    });

  // initially set token to 0, later update it with callback
  state.setToken(0);
}


export function signup() {
  console.log('signup');

  const params = {
    email: 'test@example.com',
    name: 'Max',
    password: '12345'
  };
  
  const channel = getState().socket.channels.auth;
  channel
    .push("signup", params)
    .receive("ok", (msg) => {
      console.log("signup ok");
      console.log(msg);
    })
    .receive("error", (msg) => {
      console.log("signup error");
      console.log(msg);
    });

  state.setToken(0);
}


export function requireRole(role) {
  return new Promise((resolve, reject) => {
    const { auth } = getState(), authState = auth;
    console.log(authState);
    
    const oldRole = authState.roleRequired;
    if ('user' == role)
      state.requireUserRole();
    else
      state.allowGuestAccess();

    // user set
    if (role && authState.user) {
      console.log("role access accepted");
      resolve();
    }
    // error set and no user
    else if (role && !authState.user && authState.lastAuthError) {
      console.log("role access rejected");
      reject();
    }
    // we are somewhere in the middle of token verification
    else if (role) {
      console.log("hook token assignment");
      // Hook token assignment
      const tokenSetHook = Hook((action, getState) => {
        if ('auth_setToken' == action.type) {
          console.log("set new token", action.payload);
          // console.log(action);
          tokenSetHook.cancel();
          action.payload ? resolve() : reject();
        }
      });
    }
  });
}

export function validateSessionToken() {
  return new Promise((resolve, reject) => {
    // console.log(selectors(state).isLoggedIn);
    console.log("validateSessionToken");
    const token = cookie.load('userToken');
    const channel = getState().socket.channels.auth;
    channel
      .push("verify_rememberable", { token: token })
      .receive("ok", (msg) => {
        console.log("Token accepted");
        console.log(msg);
        // if (undefined != msg.token) {
        //   cookie.save('userToken', msg.token, { path: '/' });
        // }
        // console.log(state);
        state.setToken(token);
        state.setUser(msg.user);
        resolve();
        // console.log(selectors(state).isLoggedIn);
        // setTimeout( () => {
        //   console.log(selectors(state).isLoggedIn); }, 1000);
      })
      .receive("error", (msg) => {
        console.log("Token rejected");
        console.log(msg);
        state.setToken(null);
        state.setUser(null);
        state.setLastAuthError("Token rejected");
        reject();
      });
  });
}

// Hook auth channel creation
const newChannelHook = Hook((action, getState) => {
  if ('socket_channelAdd' == action.type && action.payload.length > 0 && 'auth' == action.payload[0]) {
    console.log(action);
    validateSessionToken().then(() => {
      console.log("validateSessionToken ok");
    }).catch((error) => {
      console.log("validateSessionToken failure");
    });
  }
});
