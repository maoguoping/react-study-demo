import React from 'react';
import {withRouter } from 'react-router';
class RightList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'rightList'
    }
  }
  render() {
    return (
      <div>
      RightList
      </div>
    )
  }
}

export default withRouter(RightList);
