import React from 'react'
import {withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as appActions } from '../../../../redux/modules/app'
import { actions as authActions, roleListSelector } from '../../../../redux/modules/auth'
import './style.scss'
import http from '../../../../utils/axios'
import api from '../../../../api/index'
import { message } from 'antd'
import SearchBox from '../../../../components/module/searchBox' 
import UserListTable from './components/userListTable'
import Modal from '../../../../components/module/dialogModal'
const mapStateToProps = state => {
  return {
    roleList: roleListSelector(state)
  }
};
const mapDispatchToProps = dispatch => {
  console.log('执行绑定')
  return {
    getRoleList: bindActionCreators(authActions.getRoleList, dispatch),
    setError: bindActionCreators(appActions.setError, dispatch)
  }
};
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'userList',
      showDeleteModal: false,
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
      ],
      tableData: []
    };
    this.deleteModalData = {
      title: '删除用户',
      text: '确定要删除该用户？',
      type: 'question-circle'
    };
    this.deleteList = [];
  }
  getUserList(info) {
    let params = info || {};
    http.post(api.getUserList,params).then(res => {
      console.log(res);
      this.setState({
        tableData: res.data.list
      })
    }).catch(err => {
      this.props.setError(err);
    })
  }
  deleteUser() {
    http.get(api.deleteUser,{
      userId: this.deleteList[0]
    }).then(res => {
      message.success('删除用户成功');
      this.getUserList();
    }).catch(err => {
      this.props.setError(err);
    })
  }
  onDeleteUser = (e) => {
    console.log('delete', e)
    this.deleteList = [];
    this.deleteList.push(e.userId);
    this.setState({
      showDeleteModal: true
    })
  }
  onDeleteConfirm = (e) => {
    this.setState({
      showDeleteModal: false
    })
    this.deleteUser();
  }
  onDeleteCancel = (e) => {
    this.deleteList = [];
    this.setState({
      showDeleteModal: false
    })
  }
  onSearch = (e) => {
    console.log('搜索信息', e);
    let userId = e.userId || '';
    let roleId = e.roleId || '';
    let username = e.username || '';
    this.getUserList({
      userId,
      roleId,
      username
    });
  }
  onDetail = (e) => {
    console.log('查看详情');
    let userId = e.userId || '';
    this.props.history.push(`/managerCenter/userDetail?userId=${userId}`);
  }
  componentDidMount() {
    console.log(this.props)
    this.props.getRoleList();
    this.getUserList();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.roleList.length !== prevState.searchList[2].options.length) {
      console.log('发生改变')
      return {
        roleList: nextProps.roleList
      }
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.roleList.length !== this.state.searchList[2].options.length) {
      console.log('发生改变2')
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
          <SearchBox  list={this.state.searchList} onSearch={this.onSearch}></SearchBox>
        </div>
        <div className="user-list-content">
          <UserListTable data={this.state.tableData} roleList={this.props.roleList} onDelete={this.onDeleteUser} onDetail={this.onDetail}></UserListTable>
        </div>
        <Modal value={this.state.showDeleteModal} data={this.deleteModalData} onConfirm={this.onDeleteConfirm} onCancel = {this.onDeleteCancel}></Modal>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserList));
