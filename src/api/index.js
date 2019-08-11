import authApi from './auth'
import pageApi from './page'
const api = {
    ...authApi,
    ...pageApi
}
export default api;