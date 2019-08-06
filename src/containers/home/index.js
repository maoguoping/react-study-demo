import React from 'react';
import { Route , Switch} from 'react-router-dom'
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as pageActions, headerMenuListSelector, sideMenuListSelector } from '../../redux/modules/page';
import './style.scss';
import List from '../list/List';
import About from '../about/About';
import { Layout, Breadcrumb } from 'antd';
import HeadBar from '../../components/module/HeaderBar/HeaderBar'
import SideMenu from '../../components/module/SideMenu'
const mapStateToProps = state => {
    console.log(state)
    return {
        headerMenuList: headerMenuListSelector(state),
        sideMenuList: sideMenuListSelector(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getHeaderMenu: bindActionCreators(pageActions.getHeaderMenu, dispatch),
        getSideMenu: bindActionCreators(pageActions.getSideMenu, dispatch)
    }
};
const { Content, Sider } = Layout;
const breadcrumbList = ['nav1', 'sub1', 'child1'];
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbList: breadcrumbList,
            selectValue: ['sub1', 'child1']
        }
        this.defaultValue = ['sub1', 'child1'];
        this.changeTabMenu = this.changeTabMenu.bind(this);
        this.changeSideMenu = this.changeSideMenu.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    changeTabMenu(e) {
        let {key} = e;
        console.log(e);
        for(const item of this.props.headerMenuList) {
            if (item.value === key) {
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

    onLogout() {
        console.log('退出登录');
        this.props.history.push('/login',{from: '/home'});
    }

    componentDidMount() {
        this.props.getHeaderMenu();
        this.props.getSideMenu();
    }

    render() {
        const url = this.props.match.url;
        console.log(this.props);
        return (
            <Layout className="App">
                <HeadBar list={this.props.headerMenuList} onChange={this.changeTabMenu} onLogout={this.onLogout}></HeadBar>
                <Layout className="main">
                    <Sider width={200} style={{ background: '#fff' }}>
                        <SideMenu value={this.state.selectValue} defaultValue={this.defaultValue} list={this.props.sideMenuList} onClick={this.changeSideMenu}></SideMenu>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));
