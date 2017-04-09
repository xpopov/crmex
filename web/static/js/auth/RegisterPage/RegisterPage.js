import React from 'react';
import { Link } from 'react-router';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap';
import { Component } from 'jumpsuit';

import { PageContainer, PageErrors } from 'layouts/helpers';
// import LoginFormContainer from './LoginFormContainer';
import state, { selectors } from 'auth/auth_state';

const RegisterPage = {
  render() {
    return (~
      <PageContainer type="slim">
        <PageHeader>Register User</PageHeader>
      </PageContainer>
    ~);
  }
};

export default Component(RegisterPage, 
  (state, props) => {
    return {
      // loginError: selectors(state).loginError
    }
  })