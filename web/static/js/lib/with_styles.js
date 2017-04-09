import React, { Component } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

export default (ComposedComponent, styles) => {
  return class Styles extends Component {
    componentWillMount() {
      this.removeCss = styles._insertCss();
    }

    componentWillUnmount() {
      setTimeout(this.removeCss, 0);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
}