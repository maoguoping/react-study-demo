import React from 'react'
import { Table, Divider, Tag } from 'antd'
import './style.scss'
function UserListTable (props) {
  let roleMap = new Map();
  if (props.roleList.length > 0) {
    props.roleList.forEach(item => {
      roleMap.set(item.value, item.label);
    })
  }
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: '用户昵称',
      dataIndex: 'userTickname',
      key: 'userTickname',
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '角色',
      key: 'roleId',
      dataIndex: 'roleId',
      render: roleId => (
        <span>
          {roleId.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === '00') {
              color = 'volcano';
            }
            if (tag === '10') {
              color = 'gold';
            }
            if (tag === '20') {
              color = 'blue';
            }
            return (
              <Tag color={color} key={tag}>
                {roleMap.get(tag)}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <span className="table-action-btn detail" onClick={() => {props.onDetail(text, record)}}>详情</span>
          <Divider type="vertical" />
          <span className="table-action-btn delete" onClick={() => {props.onDelete(text, record)}}>删除</span>
        </span>
      ),
    },
  ];
  return (
    <Table className="user-list-table" columns={columns} dataSource={props.data} bordered />
  )
};
export default UserListTable;
