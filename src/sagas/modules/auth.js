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
    put(appActions.startRequest());
    try {
        const res = yield call(http.get, api.getRoleList, {});
        const data = res.data.list;
        yield put(authActions.setRoleList(data));
        put(appActions.finishRequest());
    } catch (err) {
        yield put(appActions.setError(err));
        put(appActions.finishRequest());
    }
}
export default function* initAuthSaga() {
    console.log('监听auth');
    yield takeEvery(authTypes.GET_ROLE_LIST, getRoleList);
    yield takeEvery(authTypes.LOGIN, loginIn);
}; 