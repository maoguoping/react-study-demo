import React, {useState, useEffect} from 'react'
import {withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as appActions } from '../../../../redux/modules/app'
import { actions as authActions, roleListSelector } from '../../../../redux/modules/auth'
import './style.scss'
import http from '../../../../utils/axios'
import api from '../../../../api/index'
import { message, Button } from 'antd'
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
function UserList (props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchList, setSearchList] = useState([
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
  ]);
  const [tableData, setTableData] = useState([]);
  const deleteModalData = {
    title: '删除用户',
    text: '确定要删除该用户？',
    type: 'question-circle'
  };
  let deleteList = [];
  useEffect(() => {
    props.getRoleList();
    getUserList();
  }, []);
  useEffect(() => {
    const newSearchList = searchList.map(item => {
      if (item.name === 'roleId') {
        item.options = props.roleList;
      }
      return item;
    }) 
    setSearchList(newSearchList);
  },[props.roleList]);
  function getUserList(info) {
    let params = info || {};
    http.post(api.getUserList,params).then(res => {
      console.log(res);
      setTableData(res.data.list)
    }).catch(err => {
      props.setError(err);
    })
  }
  function deleteUser() {
    http.get(api.deleteUser,{
      userId: deleteList[0]
    }).then(res => {
      message.success('删除用户成功');
      getUserList();
    }).catch(err => {
      props.setError(err);
    })
  }
  function onDeleteUser (e) {
    console.log('delete', e)
    deleteList = [];
    deleteList.push(e.userId);
    setShowDeleteModal(false);
  }
  function onAddUser () {
   props.history.push(`/managerCenter/userDetail?mode=new`);
  }
  function  onDeleteConfirm (e) {
    setShowDeleteModal(false);
    deleteUser();
  }
  function onDeleteCancel (e) {
    deleteList = [];
    setShowDeleteModal(false);
  }
  function onSearch (e) {
    console.log('搜索信息', e);
    let userId = e.userId || '';
    let roleId = e.roleId || '';
    let username = e.username || '';
    getUserList({
      userId,
      roleId,
      username
    });
  }
  function onDetail (e) {
    console.log('查看详情');
    let userId = e.userId || '';
    props.history.push(`/managerCenter/userDetail?mode=edit&userId=${userId}`);
  }
  return (
    <div className="user-list-page">
      <div className="user-list-search">
        <SearchBox  list={searchList} onSearch={onSearch}></SearchBox>
      </div>
      <div className="user-list-action-bar">
        <Button type="primary" onClick={onAddUser}>新增</Button>
      </div>
      <div className="user-list-content">
        <UserListTable data={tableData} roleList={props.roleList} onDelete={onDeleteUser} onDetail={onDetail}></UserListTable>
      </div>
      <Modal value={showDeleteModal} data={deleteModalData} onConfirm={onDeleteConfirm} onCancel = {onDeleteCancel}></Modal>
    </div>
  )
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserList));
