import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { actions as pageActions, types as pageTypes} from '../../redux/modules/page'
import { actions as appActions } from '../../redux/modules/app'
import http from '../../utils/axios'
import api from '../../api'
const getHeaderMenu = function* () {
    put(appActions.startRequest());
    try {
        const res = yield call(http.get, api.getHeaderMenuList, {});
        const list = res.data.list;
        yield put(pageActions.setHeaderMenu(list));
        put(appActions.finishRequest());
    } catch (err) {
        put(appActions.finishRequest());
        yield put(appActions.setError(err));
    }
}
const getSideMenu = function* () {
    put(appActions.startRequest());
    try {
        const res = yield call(http.get, api.getSideMenuList, {});
        const list = res.data.list;
        yield put(pageActions.setSideMenu(list));
        put(appActions.finishRequest());
    } catch (err) {
        put(appActions.finishRequest());
        yield put(appActions.setError(err));
    }
}
export default function* initPageSaga() {
    yield takeEvery(pageTypes.GET_HEADER_MENU, getHeaderMenu);
    yield takeEvery(pageTypes.GET_SIDE_MENU, getSideMenu);
}