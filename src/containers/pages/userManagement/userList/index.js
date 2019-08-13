import React from 'react'
import {withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as authActions, roleListSelector } from '../../../../redux/modules/auth'
import './style.scss'
import SearchBox from '../../../../components/module/searchBox' 
import UserListTable from './components/userListTable'
const mapStateToProps = state => {
  return {
    roleList: roleListSelector(state)
  }
};
const mapDispatchToProps = dispatch => {
  console.log('执行绑定')
  return {
    getRoleList: bindActionCreators(authActions.getRoleList, dispatch)
  }
};
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'userList',
      searchList: [
        {
          label: '用户名',
          placeholder: '请输入用户名',
          type: 'input',
          name: 'username'
        },
        {
          label: '用户id',
          placeholder: '请输入用户id',
          type: 'input',
          name: 'userId'
        },
        {
          label: '用户角色',
          placeholder: '请选择用户角色',
          type: 'select',
          name: 'roleId',
          options: []
        }
      ]
    }
  }
  componentDidMount() {
    console.log(this.props)
    this.props.getRoleList();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.roleList.length != prevState.searchList[2].options.length) {
      console.log('发生改变')
      return {
        roleList: nextProps.roleList
      }
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('发生改变2', this.props.roleList)
    if (prevProps.roleList.length != this.props.roleList.length) {
      const searchList = this.state.searchList.map(item => {
        if (item.name === 'roleId') {
          item.options = this.props.roleList;
        }
        return item;
      }) 
      this.setState({
        searchList
      });
    }
  }
  render() {
    return (
      <div className="user-list-page">
        <div className="user-list-search">
          <SearchBox  list={this.state.searchList}></SearchBox>
        </div>
        <div className="user-list-content">
          <UserListTable></UserListTable>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserList));
