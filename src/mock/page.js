import Mock from 'mockjs';
export default Mock.mock('/getHeaderMenuList', 'get', {
    code: 0,
    success: true,
    message: '成功',
    data: {
        list: [
            {
                value: '1',
                label: 'nav1'
            },
            {
                value: '2',
                label: 'nav2'
            },
            {
                value: '3',
                label: 'nav3'
            }
       ]
    }
});   