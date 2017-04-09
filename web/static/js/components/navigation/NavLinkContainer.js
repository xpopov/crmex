import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default ({to, eventKey, children}) => {
  const navItem = React.createElement(NavItem, {eventKey: eventKey}, children);
  const linkContainer = React.createElement(LinkContainer, {to: to}, navItem);
  return linkContainer;
}
