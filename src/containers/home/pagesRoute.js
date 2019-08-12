import Loadable from 'react-loadable'
import { Spin } from 'antd'
const UserList = Loadable({loader: () => import('../pages/userManagement/userList'), loading: Spin});
const RoleList = Loadable({loader: () => import('../pages/userManagement/roleList'), loading: Spin});
const RightList = Loadable({loader: () => import('../pages/userManagement/rightList'), loading: Spin});
const DeviceList = Loadable({loader: () => import('../pages/deviceManagement/deviceList'), loading: Spin});
const DeviceEventsList = Loadable({loader: () => import('../pages/deviceManagement/deviceEventsList'), loading: Spin});
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