import { combineReducers } from 'redux';
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
   ],
   innerPage: []
}

//action types
export const types = {
    GET_HEADER_MENU: 'GET_HEADER_MENU', // 获取header菜单
    GET_SIDE_MENU: 'GET_SIDE_MENU', // 获取side菜单
    SET_HEADER_MENU: 'SET_HEADER_MENU', // 设置header菜单
    SET_SIDE_MENU: 'SET_SIDE_MENU', // 设置side菜单
    SET_CURRENT_HEADER: 'SET_CURRENT_HEADER', // 设置头部菜单
    SET_CURRENT_SIDE: 'SET_CURRENT_SIDE', //设置侧菜单
    SET_INNER_PAGE: 'SET_INNER_PAGE', //设置里页面
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE', //设置当前页面
}

export const actions = {
    getHeaderMenu: () => {
        return {
            type: types.GET_HEADER_MENU
        }
    },
    getSideMenu: () => {
        return {
            type: types.GET_SIDE_MENU
        }
    },
    setCurrentHeader: header => ({
        type: types.SET_CURRENT_HEADER,
        header
    }),
    setCurrentSide: side => ({
        type: types.SET_CURRENT_SIDE,
        side
    }),
    setHeaderMenu: list => ({
        type: types.SET_HEADER_MENU,
        list
    }),
    setSideMenu: list => ({
        type: types.SET_SIDE_MENU,
        list 
    }),
    setInnerPage: list => ({
        type: types.SET_INNER_PAGE,
        list 
    }),
    setCurrentPage: page => ({
        type: types.SET_CURRENT_PAGE,
        page
    })
};

//reducers
const headerMenuList = (state = initialState.headerMenuList, action) => {
    switch(action.type) {
        case types.SET_HEADER_MENU: return action.list;
        default: return state;
    }
}
const sideMenuList = (state = initialState.sideMenuList, action) => {
    switch(action.type) {
        case types.SET_SIDE_MENU: return action.list;
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
const innerPage = (state = initialState.innerPage, action) => {
    switch(action.type) {
        case types.SET_INNER_PAGE: return action.list;
        default: return state;
    }
}
const currentPage = (state = initialState.currentPage, action) => {
    switch(action.type) {
        case types.SET_CURRENT_PAGE: return action.page;
        default: return state;
    }
}
const reducer = combineReducers({
    headerMenuList,
    sideMenuList,
    currentHeader,
    currentSide,
    innerPage,
    currentPage
});

export default reducer;

//selectors
export const headerMenuListSelector = state => state.page.headerMenuList;
export const sideMenuListSelector = state => state.page.sideMenuList;
export const menuPathSelector = state => {
    const header = state.page.currentHeader;
    const sideOne = state.page.currentSide[0];
    const sideTwo = state.page.currentSide[1];
  
    let pathList =  [
        header.value,
        sideOne.value,
        sideTwo.value
    ];
    let pathNameList = [
        header.label,
        sideOne.label,
        sideTwo.label
    ]
    if (state.page.innerPage.length > 0) {
        let innerValueList =  [];
        let  innerLabelList =  [];
        state.page.innerPage.forEach(el => {
            innerValueList.push(el.value);
            innerLabelList.push(el.label);
        });
        pathList = [...pathList, ...innerValueList];
        pathNameList = [...pathNameList, ...innerLabelList];
    }
    return {
        pathList,
        pathNameList
    }
}
export const innerPageSelector = state => state.page.innerPage;
export const currentPageSelector = state => state.page.currentPage;