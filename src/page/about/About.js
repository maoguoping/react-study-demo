import React from 'react';
import {withRouter } from 'react-router';
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'mgp'
    }
  }
  render() {
    return (
      <div>
      About123
      </div>
    )
  }
}

export default withRouter(About);
