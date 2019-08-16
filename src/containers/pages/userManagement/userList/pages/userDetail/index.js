import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
class UserDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                用户详情
            </div>
        )
    }
}
export default withRouter(UserDetail)