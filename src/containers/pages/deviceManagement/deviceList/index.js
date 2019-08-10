import React from 'react';
import {withRouter } from 'react-router';
class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'deviceList'
    }
  }
  render() {
    return (
      <div>
      DeviceList
      </div>
    )
  }
}

export default withRouter(DeviceList);