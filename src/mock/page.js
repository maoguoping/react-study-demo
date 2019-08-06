import Mock from 'mockjs';
Mock.mock('/getHeaderMenuList', 'get', {
    code: 0,
    success: true,
    message: '成功',
    data: {
        list: [
            {
                value: '1',
                label: 'nav1'
            },
            {
                value: '2',
                label: 'nav2'
            },
            {
                value: '3',
                label: 'nav3'
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
                        label: '用户列表'
                    },
                    {
                        value: 'child2',
                        label: '角色列表'
                    },
                    {
                        value: 'child3',
                        label: '权限列表'
                    }
                ]
            },
            {
                value: 'sub2',
                iconType: 'laptop',
                label: 'subnav 2',
                children: [
                    {
                        value: 'child5',
                        label: 'option5'
                    },
                    {
                        value: 'child6',
                        label: 'option6'
                    },
                    {
                        value: 'child7',
                        label: 'option7'
                    },
                    {
                        value: 'child8',
                        label: 'option8'
                    }
                ]
            },
            {
                value: 'sub3',
                iconType: 'notification',
                label: 'subnav 3',
                children: [
                    {
                        value: 'child9',
                        label: 'option9'
                    },
                    {
                        value: 'child10',
                        label: 'option10'
                    },
                    {
                        value: 'child11',
                        label: 'option11'
                    },
                    {
                        value: 'child12',
                        label: 'option12'
                    }
                ]
            }
       ]
    }
});  