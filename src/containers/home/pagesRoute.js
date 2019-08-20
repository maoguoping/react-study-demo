import Loadable from 'react-loadable'
import React from 'react'
import { Spin } from 'antd'
function Loading() {
    return (
        <div className="page-loader loader-full">
            <Spin size="large" delay="200"></Spin>
        </div>
    )
}
const UserList = Loadable({loader: () => import('../pages/userManagement/userList'), loading: Loading});
const UserDetail = Loadable({loader: () => import('../pages/userManagement/userList/pages/userDetail'), loading: Loading});
const RoleList = Loadable({loader: () => import('../pages/userManagement/roleList'), loading: Loading});
const RightList = Loadable({loader: () => import('../pages/userManagement/rightList'), loading: Loading});
const DeviceList = Loadable({loader: () => import('../pages/deviceManagement/deviceList'), loading: Loading});
const DeviceEventsList = Loadable({loader: () => import('../pages/deviceManagement/deviceEventsList'), loading: Loading});
export const defaultPage = {
    name: 'userList',
    path: '/managerCenter/userList',
    menuPath: ['1','sub1','child1'],
    component: UserList,
    exact: true
};
export const pageRouteList = [
    {
        name: 'userList',
        path: '/managerCenter/userList',
        menuPath: ['1','sub1','child1'],
        component: UserList,
        exact: true
    },
    {
        name: 'userDetail',
        path: '/managerCenter/userDetail',
        menuPath: ['1','sub1','child1'],
        component: UserDetail,
        parent: '/managerCenter/userList',
        innerPage: [
            {
                value: 'userDetail',
                label: '用户详情'
            }
        ],
        exact: false
    },
    {
        name: 'roleList',
        path: '/managerCenter/roleList',
        menuPath: ['1','sub1','child2'],
        component: RoleList,
        exact: true
    },
    {
        name: 'rightList',
        path: '/managerCenter/rightList',
        menuPath: ['1','sub1','child3'],
        component: RightList,
        exact: true
    },
    {
        name: 'deviceList',
        path: '/managerCenter/deviceList',
        menuPath: ['1','sub2','child4'],
        component: DeviceList,
        exact: true
    },
    {
        name: 'deviceEventsList',
        path: '/managerCenter/deviceEventsList',
        menuPath: ['1','sub2','child5'],
        component: DeviceEventsList,
        exact: true
    }
];