import { call, put, takeEvery } from 'redux-saga/effects'
import { actions as authActions, types as authTypes} from '../../redux/modules/auth'
import { actions as appActions } from '../../redux/modules/app'
import http from '../../utils/axios'
import api from '../../api'
const loginIn = function* (params) {
    put(appActions.startRequest());
    try {
        const res = yield call(http.post, api.loginIn, params);
        const data = res.data;
        put(appActions.finishRequest());
        yield put(authActions.setLoginInfo(data));
    } catch (err) {
        put(appActions.finishRequest());
        yield put(appActions.setError(err));
    }
}
const getRoleList = function* (params) {
    console.log('获取角色列表')
    put(appActions.startRequest());
    try {
        const res = yield call(http.get, api.getRoleList, params);
        const data = res.data.list;
        put(appActions.finishRequest());
        yield put(authActions.setRoleList(data));
    } catch (err) {
        put(appActions.finishRequest());
        yield put(appActions.setError(err));
    }
}
export default function* initAuthSaga() {
    takeEvery(authTypes.LOGIN, loginIn);
    takeEvery(authTypes.GET_ROLE_LIST, getRoleList);
}