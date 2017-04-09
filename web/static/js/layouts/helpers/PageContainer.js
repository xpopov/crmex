import React, { Component } from 'react';

import withStyles from 'lib/with_styles';
import s from "./page_container.scss";

import state, { selectors } from 'auth/auth_state';

const PageContainer = ({ type, children = undefined }) => (~
  %div(className={"container-fluid page-" + (selectors(state).isLoggedIn ? 'full' : type)})
    .row
      .col-md-7
        {children}
      { 
        selectors(state).isLoggedIn ?
          (~
            .col-md-5
              .pull-right
                Notes
          ~)
        :
          <div />
      }
~);

export default withStyles(PageContainer, s);