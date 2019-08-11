import auth from './auth';
import page from './page';
export default function initMock() {
    auth();
    page();
    console.log('加载mock数据')    
}