import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap';

import PageContainer from 'layouts/helpers/PageContainer';

export default ({ children = undefined }) => (~
  <PageContainer type="slim">
    <PageHeader>Welcome</PageHeader>
    <div>
      This is part of free access area.
    </div>
  </PageContainer>
~);