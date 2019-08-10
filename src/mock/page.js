import Mock from 'mockjs';
Mock.mock('/getHeaderMenuList', 'get', {
    code: 0,
    success: true,
    message: '成功',
    data: {
        list: [
            {
                value: '1',
                label: '管理中心',
            },
            {
                value: '2',
                label: '数据中心'
            },
            {
                value: '3',
                label: '设置'
            }
       ]
    }
});
Mock.mock('/getSideMenuList', 'get', {
    code: 0,
    success: true,
    message: '成功',
    data: {
        list: [
            {
                value: 'sub1',
                iconType: 'user',
                label: '用户管理',
                children: [
                    {
                        value: 'child1',
                        label: '用户列表',
                        target: '/managerCenter/userList'
                    },
                    {
                        value: 'child2',
                        label: '角色列表',
                        target: '/managerCenter/roleList'
                    },
                    {
                        value: 'child3',
                        label: '权限列表',
                        target: '/managerCenter/rightList'
                    }
                ]
            },
            {
                value: 'sub2',
                iconType: 'laptop',
                label: '设备管理',
                children: [
                    {
                        value: 'child4',
                        label: '设备列表',
                        target: '/managerCenter/deviceList'
                    },
                    {
                        value: 'child5',
                        label: '设备事件',
                        target: '/managerCenter/deviceEventsList'
                    }
                ]
            }
       ]
    }
});  