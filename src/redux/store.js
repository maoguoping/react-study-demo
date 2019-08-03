import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";

let finalCreateStore;
//如果程序运行在非生产环境下，且浏览器安装了调试插件，则创建包含调试插件的store
if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    finalCreateStore = compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )(createStore)
} else {
    finalCreateStore = applyMiddleware(thunk)(createStore);
}

export default function store(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    return store;
}