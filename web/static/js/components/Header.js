import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import NavLinkContainer from 'components/navigation/NavLinkContainer';
import state, { selectors } from 'auth/auth_state';

const Header = ({ children = undefined, ...props }) => (~
%div
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">CRMex</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavLinkContainer to="/welcome" eventKey={1}>Welcome</NavLinkContainer>  
        <NavLinkContainer to="/contacts" eventKey={2}>Contacts</NavLinkContainer>
        { /*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>*/ }
      </Nav>
      {
        console.log(props) || !props.isLoggedIn ?
            <Nav pullRight>
              <NavLinkContainer to="/login" eventKey={3}>Login</NavLinkContainer>  
              <NavLinkContainer to="/register" eventKey={4}>Register</NavLinkContainer>
            </Nav>
          : null
      }
    </Navbar.Collapse>
  </Navbar>
  { /*
  %nav.navbar.navbar-default.navbar-fixed-top
    .container
      .navbar-header
        %button.navbar-toggle.collapsed(type="button" data-toggle="collapse" data-target="#navbar" 
          aria-expanded="false" aria-controls="navbar")
              %span.sr-only Toggle navigation
              %span.icon-bar
              %span.icon-bar
              %span.icon-bar
        %a.navbar-brand(href="#") Project name
      #navbar.navbar-collapse.collapse
        %ul.nav.navbar-nav
          %li.active
            %a(href="#") Home
          %li
            %a(href="#") About
          %li
            %a(href="#") Contact
          %li.dropdown
            %a.dropdown-toggle(href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false") 
              Account
              %span.caret
            %ul.dropdown-menu
              %li
                %a(href="#") Profile
              %li.divider(role="separator")
              %li.dropdown-header Nav header
              %li
                %a(href="#") End
        %ul.nav.navbar-nav.navbar-right
          %li
            %a(href="#") Logout
           */ }
  {children}
~);

export default connect(
  state => {
    return {
      isLoggedIn: selectors(state).isLoggedIn
    }
  }
)(Header)
