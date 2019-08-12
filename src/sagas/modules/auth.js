import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
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
export default function* initAuthSaga() {
    yield takeEvery(authTypes.LOGIN, loginIn);
}