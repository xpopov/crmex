import React, { Component } from 'react';
import { Link } from 'react-router';

import Header from 'components/Header';
import Footer from 'components/Footer';

export default ({ children = undefined }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);