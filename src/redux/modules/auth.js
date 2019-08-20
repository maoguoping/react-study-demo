import { combineReducers } from 'redux'
const initialState = {
    userInfo: {
        userId: null,
        username: null,
    },
    roleList: []
};

//action types
export const types = {
    LOGIN: 'AUTH/LOGIN', //登录
    LOGIN_SUCCESS:'LOGIN_SUCCESS', //登录成功
    LOGIN_ERROR:'LOGIN_ERROR', //登录失败
    LOGOUT: 'AUTH/LOGOUT', //注销
    SET_USER_INFO: 'SET_USER_INFO', //设置用户信息
    GET_ROLE_LIST: 'GET_ROLE_LIST', //获取角色列表
    SET_ROLE_LIST: 'SET_ROLE_LIST', //设置角色列表
};

//action creators
export const actions = {
    //异步action，执行登录验证
    login: (username, password) => {
        return {
            type: types.LOGIN,
            params: {
                username,
                password
            }
        }  
    },
    loginSuccess: (data) => ({
        type: types.LOGIN_SUCCESS,
        userId: data.userId,
        username: data.username 
    }),
    loginError: (err) => ({
        type: types.LOGIN_ERROR,
        err
    }),
    logout: () => ({
        type: types.LOGOUT
    }),
    setLoginInfo: (data) => ({
        type: types.SET_USER_INFO,
        userId: data.userId,
        username: data.username
    }),
    //异步action，执行登录验证
    getRoleList: () => {
        console.log('获取角色列表', types.GET_ROLE_LIST);
        return {
            type: types.GET_ROLE_LIST 
        }
    },
    setRoleList: list => ({
        type: types.SET_ROLE_LIST,
        list
    })
};

//reducers
const userInfo = (state = initialState.userInfo, action) => {
    switch (action.type) {
        case types.SET_USER_INFO: 
            return { ...state, userId: action.userId, username: action.username };
        case types.LOGIN_SUCCESS:
            return { ...state, userId: action.userId, username: action.username };
        case types.LOGOUT:
            return { ...state, userId: null, username: null}
        default:
            return state;
    }
}
//reducers
const roleList = (state = initialState.roleList, action) => {
    switch (action.type) {
        case types.SET_ROLE_LIST: 
            return action.list;
        default:
            return state;
    }
}
const reducer = combineReducers({
    userInfo,
    roleList
});
export default reducer;

//selectors
export const userInfoSelector = state => state.auth.userInfo;
export const roleListSelector = state => state.auth.roleList;