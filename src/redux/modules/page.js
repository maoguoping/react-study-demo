import { combineReducers } from 'redux';
import { actions as appActions } from './app'
import http from '../../utils/axios';
const initialState = {
   currentPage: null,
   headerMenuList: [],
   sideMenuList: [],
   currentHeader: {
        value: 1,
        label: '管理中心'
   },
   currentSide: [
       {
            value: 'sub1',
            label: '用户管理'
       },
       {
            value: 'child1',
            label: '用户列表'
       }
   ]
}

//action types
export const types = {
    GET_HEADER_MENU: 'GET_HEADER_MENU', // 获取header菜单
    GET_SIDE_MENU: 'GET_SIDE_MENU', // 获取side菜单
    SET_CURRENT_HEADER: 'SET_CURRENT_HEADER', // 设置头部菜单
    SET_CURRENT_SIDE: 'SET_CURRENT_SIDE', //设置侧菜单
}

export const actions = {
    getHeaderMenu: () => {
        return (dispatch, getState) => {
            dispatch(appActions.startRequest());
            http.get('/getHeaderMenuList',{}).then(res => {
                dispatch(appActions.finishRequest());
                dispatch(getHeaderMenuSuccess(res.data.list));
            }).catch(err => {
                dispatch(appActions.finishRequest());
                dispatch(appActions.setError(err));
            })
        }
    },
    getSideMenu: () => {
        return (dispatch, getState) => {
            dispatch(appActions.startRequest());
            http.get('/getSideMenuList',{}).then(res => {
                dispatch(appActions.finishRequest());
                dispatch(getSideMenuSuccess(res.data.list));
            }).catch(err => {
                dispatch(appActions.finishRequest());
                dispatch(appActions.setError(err));
            })
        }
    },
    setCurrentHeader: header => ({
        type: types.SET_CURRENT_HEADER,
        header
    }),
    setCurrentSide: side => ({
        type: types.SET_CURRENT_SIDE,
        side
    })   
};

const getHeaderMenuSuccess = list => ({
    type: types.GET_HEADER_MENU,
    list
})

const getSideMenuSuccess  = list => ({
    type: types.GET_SIDE_MENU,
    list 
})

//reducers
const headerMenuList = (state = initialState.headerMenuList, action) => {
    switch(action.type) {
        case types.GET_HEADER_MENU: return action.list;
        default: return state;
    }
}
const sideMenuList = (state = initialState.sideMenuList, action) => {
    switch(action.type) {
        case types.GET_SIDE_MENU: return action.list;
        default: return state;
    }
}
const currentHeader = (state = initialState.currentHeader, action) => {
    switch(action.type) {
        case types.SET_CURRENT_HEADER: return action.header;
        default: return state;
    }
}
const currentSide = (state = initialState.currentSide, action) => {
    switch(action.type) {
        case types.SET_CURRENT_SIDE: return action.side;
        default: return state;
    }
}
const reducer = combineReducers({
    headerMenuList,
    sideMenuList,
    currentHeader,
    currentSide
});

export default reducer;

//selectors
export const headerMenuListSelector = state => state.page.headerMenuList;
export const sideMenuListSelector = state => state.page.sideMenuList;
export const menuPathSelector = state => {
    const header = state.page.currentHeader;
    const sideOne = state.page.currentSide[0];
    const sideTwo = state.page.currentSide[1];
    console.log('获取面包屑', state.page);
    return {
        pathList: [
            header.value,
            sideOne.value,
            sideTwo.value
        ],
        pathNameList: [
            header.label,
            sideOne.label,
            sideTwo.label
        ]
    }
}