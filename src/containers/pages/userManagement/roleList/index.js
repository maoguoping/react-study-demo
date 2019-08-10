import React from 'react';
import {withRouter } from 'react-router';
class RoleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'roleList'
    }
  }
  render() {
    return (
      <div>
      RoleList
      </div>
    )
  }
}

export default withRouter(RoleList);
