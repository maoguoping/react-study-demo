import { actions as appActions } from "./app";
import http from "../../utils/axios";
const initialState = {
    userId: null,
    username: null
};

//action types
export const types = {
    LOGIN: 'AUTH/LOGIN', //登录
    LOGOUT: 'AUTH/LOGOUT' //注销
};

//action creators
export const actions = {
    //异步action，执行登录验证
    login: (username, password) => {
        return dispatch => {
            //每个api请求开始前发送action
            dispatch(appActions.startRequest());
            const params = { username, password };
            return http.post('/loginIn', params).then(res => {
                console.log(res);
                dispatch(actions.setLoginInfo(), res.data.userId, username);
            })
        }
    },
    logout: () => ({
        type: types.LOGOUT
    }),
    setLoginInfo: (userId, username) => ({
        type: types.LOGIN,
        userId,
        username
    })
};

//reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN: 
            return { ...state, userId: action.userId, username: action.username };
        case types.LOGOUT:
                return { ...state, userId: null, username: null };
        default:
            return state;
    }
}
export default reducer;

//selectors
export const getLoggeredUser = state => ({
    userId: state.userId,
    username: state.username
});