import React from 'react'
import PropsTypes from 'prop-types';
import {Menu, Icon } from 'antd';
const { SubMenu } = Menu;
function SideMenu(props) {
    const {list} = props;      
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                {
                    list.map(subItem =>
                        <SubMenu
                            key={subItem.value}
                            title={
                                <span><Icon type={subItem.iconType} />{subItem.label}</span>
                            }
                        >
                            {subItem.children.map(childrenItem => <Menu.Item key={childrenItem.value}>{childrenItem.label}</Menu.Item>)}
                        </SubMenu>
                    )
                }
            </Menu>
        )
}
SideMenu.PropsTypes = {
    list: PropsTypes.object.isRequired
}
SideMenu.defaultProps = {
    list: []
}
export default SideMenu;
