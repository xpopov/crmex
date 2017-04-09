import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

// Todo: errors receive array of errors
const PageErrors = ({ error, errors = undefined }) => (
  <div>
    {
      error ? 
        <Alert bsStyle="danger">
          { error }
        </Alert>
      : null
    }
  </div>
);

export default PageErrors;