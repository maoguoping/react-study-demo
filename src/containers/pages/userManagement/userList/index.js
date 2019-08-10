import React from 'react';
import {withRouter } from 'react-router';
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'userList'
    }
  }
  render() {
    return (
      <div>
      UserList
      </div>
    )
  }
}

export default withRouter(UserList);
