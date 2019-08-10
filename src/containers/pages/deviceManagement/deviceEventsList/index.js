import React from 'react';
import {withRouter } from 'react-router';
class DeviceEventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'deviceEventsList'
    }
  }
  render() {
    return (
      <div>
      DeviceEventsList
      </div>
    )
  }
}

export default withRouter(DeviceEventsList);