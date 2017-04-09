import React, { Component } from 'react';
import { browserHistory, Router, Route, Match, IndexRoute, Link } from 'react-router';
import { State, Actions } from 'jumpsuit'
// import Router from 'react-router-addons-controlled/ControlledBrowserRouter';

import Layout from 'layouts/MainLayout';
import LoginPage from 'auth/LoginPage';
import RegisterPage from 'auth/RegisterPage';

import Welcome from 'roles/guest/WelcomePage';
import Dashboard from 'roles/user/DashboardPage';

import StartupActions from 'startup';
import { requireRole, validateSessionToken } from 'auth/auth_actions';

const initialize = () => {
  console.log('initialize');
  StartupActions.initialize();
}

function requireAuth(nextState, replace, callback) {
  console.log('require AUTH');
  // console.log(nextState);
  // console.log('AUTH');

  // ask for User Role
  requireRole('user').then(() => {
    console.log('AUTH OK');
    callback();
  }).catch(() => {
    console.log('AUTH failed');
    // If fail - go to public side
    replace({
      pathname: '/' == nextState.location.pathname ? '/welcome' : '/login',
      state: { nextPathname: nextState.location.pathname }
    })
    callback();
  });
}

function freeAuth() {
  console.log('freeAuth');
}

const Logout = () => (<div>Logout</div>);

const Contacts = () => (<div>Contacts</div>);

const Contact = () => (<div>Contact</div>);

const App = () => (
  <div>
    <Router history={browserHistory}>
      {/*<Route path="/" component={Layout}></Route>*/}
      <Route component={Layout} onEnter={initialize}>
        {/* Protected access area */}
        <Route path="/" onEnter={requireAuth}>
          <IndexRoute component={Dashboard} />
          <Route path="contacts">
            <IndexRoute component={Contacts} />
            <Route path=":id" component={Contact} />
          </Route>
        </Route>
        {/* Free access area */}
        <Route onEnter={freeAuth}>
          <Route path="/welcome" component={Welcome}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterPage}/>
        </Route>
      </Route>
    </Router>
    {/*<Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/counter" component={Counter} />*/}
  </div>
);

// const token = localStorage.getItem('token');

export default App;
