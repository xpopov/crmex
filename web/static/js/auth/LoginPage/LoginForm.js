import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap';
import { State, Actions } from 'jumpsuit';
import { Field } from 'redux-form';

import { ReduxFormField, ReduxFormGroup }  from 'components/redux-form';

export default (props) => {
  const {handleSubmit, email} = props;
  return (~
    <Form horizontal onSubmit={handleSubmit}>
      <Field component={ReduxFormGroup} name="email">
        <Col componentClass={ControlLabel} sm={3}>
          E-mail:
        </Col>
        <Col sm={8}>
          <Field name="email" component={ReduxFormField} type="text" />
        </Col>
      </Field>
      <Field component={ReduxFormGroup} name="password">
        <Col componentClass={ControlLabel} sm={3}>
          Password
        </Col>
        <Col sm={8}>
          <Field name="password" component={ReduxFormField} type="password" />
        </Col>
      </Field>
      <FormGroup>
        .col-sm-3
        .col-sm-3
          <Button type="submit">Login</Button>
      </FormGroup>
    </Form>
~)};