import pageSaga from './modules/page'
import authSaga from './modules/auth'
function* saga() {
  yield* pageSaga();
  yield* authSaga();
}

export default saga;