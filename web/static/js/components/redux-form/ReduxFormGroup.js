import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap';
import { State, Actions } from 'jumpsuit';

export default ({
  name,
  feedbackIcon,
  meta,
  input = undefined,
  children,
  ...props
}) => {
  let message = undefined;
  const { error, warning, touched } = meta || { null, null, null };
  // console.log("ReduxFormGroup", meta, props);
  const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;

  if ( touched && ( error || warning ) ) {
    message = <span className="help-block">{ error || warning }</span>;
  }

  // Here we can change error message format based on children, or something else
  // if (children.length > 0) {
  //   console.log(children);
  // }

  return (~
    %div
      <FormGroup name={name} controlId={name} validationState={ validationState } { ...props }>
        { children }
        .col-md-12.col-sm-12
          { message }
      </FormGroup>
  ~);
}