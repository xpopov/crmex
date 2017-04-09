import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { State, Actions } from 'jumpsuit';

import LoginForm from './LoginForm';
import { validation, fields } from './login_form_schema';
import reduxFormWrapper from 'lib/redux-form/redux_form_wrapper';
import { signin } from 'auth/auth_actions';

export default (props) => {
  const { onLoginSuccess, onLoginError } = props;
  const _reduxForm = reduxFormWrapper(
    /* pass props */
    {
      form: 'login_form'
    }, 
    /* default field values */
    {
      email: 'testuser@example.com',
      password: 'secret'
    },
    validation,
    values => {
      return new Promise((resolve, reject) => {
        signin(
          values,
          onLoginSuccess,
          onLoginError
        );
        // reject(new SubmissionError({
        //   email: "Server is not happy"
        // }));
        resolve();
    })},
    LoginForm
  );
  // return reduxForm;
  // console.log(reduxForm(props, context));
  return <_reduxForm/>;
}