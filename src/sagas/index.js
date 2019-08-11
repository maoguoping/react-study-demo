import pageSage from './modules/page'

function* saga() {
  yield pageSage();
}

export default saga;