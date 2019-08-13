import Mock from 'mockjs';
export default function auth() {
    Mock.mock('/loginIn', 'post', {
        code: 0,
        success: true,
        message: '登录成功',
        data: {
            userId: '007',
            username: 'mgp'
        }
    });
    Mock.mock('/getRoleList', 'get', {
        code: 0,
        success: true,
        message: '获取成功',
        data: {
            list: [
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
} 