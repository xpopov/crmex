import React from 'react';
import { Link, withRouter } from 'react-router';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap';
import { Component } from 'jumpsuit';

import { PageContainer, PageErrors } from 'layouts/helpers';
import LoginFormContainer from './LoginFormContainer';
import state, { selectors } from 'auth/auth_state';

const LoginPage = {
  handleLoginSuccess() {
    console.log(this.props.router);
    this.props.router.replace('/');
  },
  handleLoginError(message) {
    state.setLoginError(message);
  },
  render() {
    return (~
      <PageContainer type="slim">
        <PageHeader>Login</PageHeader>
        <PageErrors error={ this.props.loginError } />
        <LoginFormContainer onLoginSuccess={this.handleLoginSuccess} onLoginError={this.handleLoginError} />
      </PageContainer>
    ~);
  }
};

export default withRouter(Component(LoginPage,
  (state, props) => {
    return {
      loginError: selectors(state).loginError
    }
  })
);