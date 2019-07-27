import React from 'react';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import './Home.scss';
import List from '../list/List';
import About from '../about/About';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import SideMenu from '../../components/module/SideMenu'
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
const breadcrumbList = ['nav1', 'sub1', 'child1'];
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbList: breadcrumbList,
            sideMenuList: [],
            selectValue: ['sub1', 'child1']
        }
        this.defaultValue = ['sub1', 'child1'];
        this.changeTabMenu = this.changeTabMenu.bind(this);
        this.changeSideMenu = this.changeSideMenu.bind(this);
    }

    changeTabMenu(e) {
        let {key} = e;
        console.log(e);
        for(const item of headerMenuList) {
            if (item.value == key) {
                this.setState({
                    breadcrumbList: [item.label, ...this.defaultValue],
                    selectValue: [item.value, ...this.defaultValue]
                });
                break;
            }
        }
    }
    
    changeSideMenu(e) {
        let {keyPath} = e;
        let navName = this.state.breadcrumbList[0];
        let path = keyPath.reverse();
        this.setState({
            breadcrumbList:[navName,...path],
            selectValue: keyPath
        })
    }

    componentDidMount() {
        let sideMenuList = [
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
        this.setState({
            sideMenuList
        })
    }

    render() {
        const url = this.props.match.url;
        return (
            <Layout className="App">
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                        onClick={this.changeTabMenu}
                    >
                        {headerMenuList.map(item => <Menu.Item key={item.value}>{item.label}</Menu.Item>)}
                    </Menu>
                </Header>
                <Layout className="main">
                    <Sider width={200} style={{ background: '#fff' }}>
                        <SideMenu value={this.state.selectValue} defaultValue={this.defaultValue} list={this.state.sideMenuList} onClick={this.changeSideMenu}></SideMenu>
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
                            <Switch>
                                <Route exact path={url} component={About} />
                                <Route path={`${url}/about`} component={About} />
                                <Route path={`${url}/list`} component={List} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Home;
