import React from 'react';
import {withRouter} from 'react-router';
class List extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: 'mgp'
    }
  }
  render() {
    return (
      <div>List</div>
    )
  }
}

export default withRouter(List);
