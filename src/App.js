import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss';
import List from './page/List';
import About from './page/About';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import SideMenu from './components/module/SideMenu'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const headerMenuList = [
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
];
const leftMemu = [
    {
        value: 'sub1',
        iconType: 'user',
        label: 'subnav 1',
        children: [
            {
                value: 'child1',
                label: 'option1'
            },
            {
                value: 'child2',
                label: 'option2'
            },
            {
                value: 'child3',
                label: 'option3'
            },
            {
                value: 'child4',
                label: 'option4'
            }
        ]
    },
    {
        value: 'sub2',
        iconType: 'laptop',
        label: 'subnav 2',
        children: [
            {
                value: 'child5',
                label: 'option5'
            },
            {
                value: 'child6',
                label: 'option6'
            },
            {
                value: 'child7',
                label: 'option7'
            },
            {
                value: 'child8',
                label: 'option8'
            }
        ]
    },
    {
        value: 'sub3',
        iconType: 'notification',
        label: 'subnav 3',
        children: [
            {
                value: 'child9',
                label: 'option9'
            },
            {
                value: 'child10',
                label: 'option10'
            },
            {
                value: 'child11',
                label: 'option11'
            },
            {
                value: 'child12',
                label: 'option12'
            }
        ]
    }
];
const breadcrumbList = ['Home', 'List', 'App'];
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbList: breadcrumbList
        }
    }

    changeTabMenu(e) {
        let {key} = e;
        console.log(key);
        this.setState({
            breadcrumbList: [key]
        });
    }

    render() {
        return (
            <Layout className="App">
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                        onClick={(...arg) => {this.changeTabMenu(...arg)}}
                    >
                        {headerMenuList.map(item => <Menu.Item key={item.value}>{item.label}</Menu.Item>)}
                    </Menu>
                </Header>
                <Layout className="main">
                    <Sider width={200} style={{ background: '#fff' }}>
                        <SideMenu list={leftMemu}></SideMenu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {this.state.breadcrumbList.map(item => <Breadcrumb.Item key={'list' + item}>{item}</Breadcrumb.Item>)}
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Router component={About}>
                                <Route path="/about" component={About} />
                                <Route path="/list" component={List} />
                            </Router>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default App;
