import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap';
import { State, Actions } from 'jumpsuit';

export default ({
  feedbackIcon,
  input,
  label,
  type,
  meta: { error, warning, touched },
  ...props
}) => {
  const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;

  // if ( touched && ( error || warning ) ) {
  //   message = <span className="help-block">{ error || warning }</span>;
  // }

  return (
    <div>
     {/*<FormGroup validationState={ validationState }>*/}
       {/*<ControlLabel>{ label }</ControlLabel>*/}
      <FormControl { ...input } type={ type } { ...props } />
      { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> : null }
     {/*</FormGroup>*/}
    </div>
  );
}