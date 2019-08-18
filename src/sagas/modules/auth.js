import { call, put, takeEvery, take, fork, all, cancel  } from 'redux-saga/effects'
import { actions as authActions, types as authTypes} from '../../redux/modules/auth'
import { actions as appActions } from '../../redux/modules/app'
import http from '../../utils/axios'
import api from '../../api'
const loginIn = function* (params) {
    put(appActions.startRequest());
    try {
        const res = yield call(http.post, api.loginIn, params);
        const data = res.data;
        yield put(authActions.loginSuccess(data))
        put(appActions.finishRequest());
        return data;
    } catch (err) {
        yield put(authActions.loginError(err))
        yield put(appActions.setError(err));
        yield put(authActions.setLoginInfo({userId: null, username: null}));
        put(appActions.finishRequest());
    }
}
const getRoleList = function* (params) {
    put(appActions.startRequest());
    try {
        const res = yield call(http.get, api.getRoleList, {});
        const data = res.data.list;
        yield put(authActions.setRoleList(data));
        put(appActions.finishRequest());
        return data;
    } catch (err) {
        yield put(appActions.setError(err));
        put(appActions.finishRequest());
    }
}
const loginFlowWatcher = function* () {
    console.log('login初始化');
    while(true) {
        const { params } =  yield take(authTypes.LOGIN);
        console.log('收到登录');
        const task = yield fork(loginIn, params);
        const action = yield take([authTypes.LOGOUT, authTypes.LOGIN_ERROR])
        if(action.type === authTypes.LOGOUT) {
            yield cancel(task);
        }
        yield put(authActions.setLoginInfo({userId: null, username: null}));
    }
}
const roleListFlowWatcher = function* () {
    console.log('roleList初始化');
    while(true) {
        yield take(authTypes.GET_ROLE_LIST);
        const list = yield call(getRoleList);
        if(list) {
            put(authActions.setRoleList(list));
        } else {
            put(authActions.setRoleList([]));
        }
    }
}
export default function* initAuthSaga() {
    console.log('auth初始化');
    yield all([
        fork(loginFlowWatcher),
        fork(roleListFlowWatcher)
    ]);
}