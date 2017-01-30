import React, { Component } from 'react';
import { browserHistory, Router, Route, Match, IndexRoute, Link } from 'react-router';
// import Router from 'react-router-addons-controlled/ControlledBrowserRouter';

function requireAuth(nextState, replace) {
  if (0/*!auth.loggedIn()*/) {
    replace({
      pathname: '/welcome',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const Layout = ({ children = undefined }) => (<div>Layout. <Link to="/welcome">Welcome</Link>{children}</div>);

const Login = () => (<div>Login</div>);

const Logout = () => (<div>Logout</div>);

const _Welcome = () => (<div>Welcomess2</div>);

const Welcome = () => (<div><_Welcome></_Welcome></div>);

const Dashboard = () => (<div>Dashboard</div>);

const Contacts = () => (<div>Contacts</div>);

const Contact = () => (<div>Contact</div>);

const App = () => (
  <div>
    <Router history={browserHistory}>
      <Route path="/" onEnter={requireAuth}></Route>
      <Route component={Layout}>
        <IndexRoute component={Dashboard} />
        <Route path="contacts">
          <IndexRoute component={Contacts} />
          <Route path=":id" component={Contact} />
        </Route>
        <Route path="/welcome" component={Welcome}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout} />
      </Route>
    </Router>
    {/*<Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/counter" component={Counter} />*/}
    Test3
  </div>
);

// const token = localStorage.getItem('token');

export default App;
