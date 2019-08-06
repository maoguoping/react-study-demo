import { combineReducers } from 'redux';
import { actions as appActions } from './app'
import http from '../../utils/axios';
const initialState = {
   currentPage: null,
   headerMenuList: [],
   sideMenuList: []
}

//action types
export const types = {
    GET_HEADER_MENU: 'GET_HEADER_MENU',   //获取header菜单
    GET_SIDE_MENU: 'GET_SIDE_MENU', //获取side菜单
}

export const actions = {
    getHeaderMenu: () => {
        return (dispatch, getState) => {
            dispatch(appActions.startRequest());
            http.get('/getHeaderMenuList',{}).then(res => {
                dispatch(appActions.finishRequest());
                console.log(res);
                dispatch(getHeaderMenuSuccess(res.data.list));
            }).catch(err => {
                dispatch(appActions.finishRequest());
                dispatch(appActions.setError(err));
            })
        }
    },  
};

const getHeaderMenuSuccess = (list) => ({
    type: types.GET_HEADER_MENU,
    list
})

//reducers
const headerMenuList = (state = initialState.headerMenuList, action) => {
    switch(action.type) {
        case types.GET_HEADER_MENU: return action.list;
        default: return state;
    }
}

const reducer = combineReducers({
    headerMenuList
});

export default reducer;

//selectors
export const headerMenuListSelector = state => state.headerMenuList;