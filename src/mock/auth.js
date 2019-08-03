import Mock from 'mockjs';
export default Mock.mock('/loginIn', 'post', {
    code: 0,
    success: true,
    message: '登录成功',
    data: {
        userId: '007'
    }
});   