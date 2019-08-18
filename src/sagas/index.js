import pageSaga from './modules/page'
import authSaga from './modules/auth'
import { fork, all } from 'redux-saga/effects';
function* saga() {
  console.log('sage初始化');
  yield all([
    fork(authSaga),
    fork(pageSaga)
  ]);
}
export default saga;