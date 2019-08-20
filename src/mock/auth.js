import Mock from 'mockjs'
import { getParams } from './utils' 
let userList = [
    {
        key: '1',
        username: 'John Brown',
        userTickname: '2342',
        userId: '1',
        age: 32,
        address: 'New York No. 1 Lake Park',
        roleId: ['00'],
    },
    {
        key: '2',
        username: 'Jim Green',
        userTickname: '2342',
        userId: '2',
        age: 42,
        address: 'London No. 1 Lake Park',
        roleId: ['01'],
    },
    {
        key: '3',
        username: 'Joe Black',
        userTickname: '2342',
        userId: '3',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        roleId: ['01','10'],
    },
    {
        key: '4',
        username: 'Jim Green3',
        userTickname: '2342',
        userId: '4',
        age: 42,
        address: 'London No. 1 Lake Park',
        roleId: ['20'],
    },
    {
        key: '5',
        username: 'Joe Blackt',
        userTickname: '23423',
        userId: '5',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        roleId: ['20'],
    }
]
export default function auth() {
    Mock.mock(/\/loginIn/, 'post',(...args) => {
        console.log('登陆接口', args);
        return {
            code: 0,
            success: true,
            message: '登录成功',
            data: {
                userId: '007',
                username: 'mgp'
            }
        }
    });
    Mock.mock(/\/getRoleList/, 'get', {
        code: 0,
        success: true,
        message: '获取成功',
        data: {
            list: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '00',
                    label: '超级管理员'
                },
                {
                    value: '01',
                    label: '管理员'
                },
                {
                    value: '10',
                    label: '会员'
                },
                {
                    value: '20',
                    label: '普通用户'
                }
            ],
            total: 2
        }
    });
    Mock.mock(/\/getUserList/, 'post', (options) =>{
        const { userId, roleId, username } = JSON.parse(options.body);
        const filterList = userList.filter(item => {
            if (userId) {
                if(userId !== item.userId) {
                    return false;
                }
            }
            if (roleId) {
                if(!item.roleId.includes(roleId)) {
                    return false;
                }
            }
            if (username) {
                if(username !== item.username) {
                    return false;
                }
            }
            return true;
        })
        return  {
            code: 0,
            success: true,
            message: '获取成功',
            data: {
                list: filterList,
                page: 1,
                size: 10,
                total: 3
            }
        }
    });
    Mock.mock(/\/deleteUser/, 'get', (options) => {
        let params = getParams(options.url) 
        userList = userList.filter(item => {
            return item.userId !== params.userId
        })
        console.log(userList)
        return {
            code: 0,
            success: true,
            message: '删除成功',
            data: {
               userId: params.userId
            }
        }
    });  
} 