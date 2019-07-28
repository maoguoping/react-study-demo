import React from 'react';
import {Layout, Menu, Avatar, Dropdown} from 'antd';
import './HeaderBar.scss'
const {Header} = Layout;
class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.chooseMenu = this.chooseMenu.bind(this);
        this.menu = (
            <Menu onClick={this.chooseMenu}>
              <Menu.Item key="1">个人中心</Menu.Item>
              <Menu.Item key="2">设置</Menu.Item>
              <Menu.Item key="3">退出</Menu.Item>
            </Menu>
        );
    }

    chooseMenu(e) {
        console.log(e);
        const {key} = e;
        if (key === '3') {
            this.props.onLogout();
        }
    }

    render() {
        const { onChange, list } = this.props;
        return (
            <Header className="header">
                    <div className="header-left">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                            onClick={onChange}
                        >
                            {list.map(item => <Menu.Item key={item.value}>{item.label}</Menu.Item>)}
                        </Menu>
                    </div>
                    <div className="header-right user-info-box">
                        <Dropdown overlay={this.menu} trigger={['click']} placement="bottomCenter">
                            <Avatar icon="user" className="avatar"/>
                        </Dropdown>
                    </div>
            </Header>
        )
    }
}
export default HeaderBar;