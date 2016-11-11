import React, { Component } from 'react';

const { PropTypes } = React;

export default class ExampleBase extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };
}

/*


export default class ExampleBase extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };
}
*/
