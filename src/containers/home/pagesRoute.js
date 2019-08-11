import asyncComponent from '../../components/module/asycComponent';
const AsyncUserList = asyncComponent(() => import('../pages/userManagement/userList'));
const AsyncRoleList = asyncComponent(() => import('../pages/userManagement/roleList'));
const AsyncRightList = asyncComponent(() => import('../pages/userManagement/rightList'));
const AsyncDeviceList = asyncComponent(() => import('../pages/deviceManagement/deviceList'));
const AsyncDeviceEventsList = asyncComponent(() => import('../pages/deviceManagement/deviceEventsList'));
export const defaultPage = {
    name: 'userList',
    path: '/managerCenter/userList',
    menuPath: ['1','sub1','child1'],
    component: AsyncUserList,
    exact: true
};
export const pageRouteList = [
    {
        name: 'userList',
        path: '/managerCenter/userList',
        menuPath: ['1','sub1','child1'],
        component: AsyncUserList,
        exact: true
    },
    {
        name: 'roleList',
        path: '/managerCenter/roleList',
        menuPath: ['1','sub1','child2'],
        component: AsyncRoleList,
        exact: true
    },
    {
        name: 'rightList',
        path: '/managerCenter/rightList',
        menuPath: ['1','sub1','child3'],
        component: AsyncRightList,
        exact: true
    },
    {
        name: 'deviceList',
        path: '/managerCenter/deviceList',
        menuPath: ['1','sub2','child4'],
        component: AsyncDeviceList,
        exact: true
    },
    {
        name: 'deviceEventsList',
        path: '/managerCenter/deviceEventsList',
        menuPath: ['1','sub2','child5'],
        component: AsyncDeviceEventsList,
        exact: true
    }
];