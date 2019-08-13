import React from 'react'
import { Table, Divider, Tag } from 'antd';

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
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
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
        <a href="javascript:;">详情 {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">删除</a>
      </span>
    ),
  },
];
const data = [
  {
    key: '1',
    username: 'John Brown',
    userTickname: '2342',
    userId: '1231',
    age: 32,
    address: 'New York No. 1 Lake Park',
    roleId: ['nice', 'developer'],
  },
  {
    key: '2',
    username: 'Jim Green',
    userTickname: '2342',
    userId: '1231',
    age: 42,
    address: 'London No. 1 Lake Park',
    roleId: ['loser'],
  },
  {
    key: '3',
    username: 'Joe Black',
    userTickname: '2342',
    userId: '1231',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    roleId: ['cool', 'teacher'],
  },
];
export default function UserListTable() {
    return <Table className="user-list-table" columns={columns} dataSource={data} bordered/>
}
