import { Socket } from 'phoenix';
import { getState, State, Actions } from 'jumpsuit';
import cookie from 'react-cookie';

const state = State('auth', {
  // Initial State
  initial: {
    roleRequired: null,
    token: null,
    user: null,
    lastAuthError: null,
    loginError: null
  },

  // Actions
  requireUserRole(state) {
    return { ...state, roleRequired: 'user' }
  },

  allowGuestAccess(state) {
    return { ...state, roleRequired: null }
  },

  setToken(state, token) {
    let newState = { token: token };
    if (token)
      newState['lastAuthError'] = null;
    return { ...state, ...newState }
  },

  setUser(state, user) {
    let newState = { user: user };
    if (user)
      newState['lastAuthError'] = null;
    return { ...state, ...newState }
  },

  setLastAuthError(state, lastAuthError) {
    return { ...state, lastAuthError: lastAuthError }
  },

  setLoginError(state, loginError) {
    return { ...state, loginError: loginError }
  }
});
export default state;


// use in mapStateToProps
export function selectors(state) {
  let _state = state.auth;//getState().auth;
  if (undefined === _state)
    return {};
  console.log(_state);
  console.log(getState().auth);
  return {
    isLoggedIn: null != _state.user,
    loginError: _state.loginError
  }
}
