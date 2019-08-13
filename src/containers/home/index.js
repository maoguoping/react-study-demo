import React from 'react'
import { Route , Switch} from 'react-router-dom'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as pageActions, headerMenuListSelector, sideMenuListSelector, menuPathSelector } from '../../redux/modules/page'
import './style.scss'
import { pageRouteList, defaultPage} from './pagesRoute'
import { Layout, Breadcrumb } from 'antd'
import HeadBar from '../../components/module/headerBar'
import SideMenu from '../../components/module/sideMenu'
const mapStateToProps = state => {
    return {
        headerMenuList: headerMenuListSelector(state),
        sideMenuList: sideMenuListSelector(state),
        menuPathInfo: menuPathSelector(state)
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getHeaderMenu: bindActionCreators(pageActions.getHeaderMenu, dispatch),
        getSideMenu: bindActionCreators(pageActions.getSideMenu, dispatch),
        setCurrentHeader: bindActionCreators(pageActions.setCurrentHeader, dispatch),
        setCurrentSide: bindActionCreators(pageActions.setCurrentSide, dispatch)
    }
};
const { Content, Sider } = Layout;
class Home extends React.Component {
    constructor(props) {
        super(props);
        let path = props.history.location.pathname;
        let menuPath = [];
        if (path === '/') {
            menuPath = defaultPage.menuPath;
        } else {
            for (const page of pageRouteList) {
                if (page.path === path) {
                    menuPath = page.menuPath;
                    break;
                }
            }
        }
        this.state = {
            selectValue: menuPath.slice(1)
        }
        this.defaultValue = menuPath.slice(1);
        this.changeTabMenu = this.changeTabMenu.bind(this);
        this.changeSideMenu = this.changeSideMenu.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    changeTabMenu(e) {
        let {key} = e;
        for(const item of this.props.headerMenuList) {
            if (item.value === key) {
                this.setState({
                    selectValue: this.props.menuPathInfo.pathNameList
                });
                this.props.setCurrentHeader({
                    value: key,
                    label: item.value
                })
                break;
            }
        }
    }
    
    changeSideMenu(e) {
        let {keyPath} = e;
        keyPath = keyPath.reverse();
        const sideList = this.props.sideMenuList;
        const firstSideValue = keyPath[0];
        const secondSideValue = keyPath[1];
        let firstSideLabel = null;
        let secondSideLabel = null;
        let target = null;
        for (const item of sideList) {
            if (item.value === firstSideValue) {
                firstSideLabel = item.label;
                for (const child of item.children) {
                    if (child.value === secondSideValue) {
                        secondSideLabel = child.label;
                        target = child.target
                        break;
                    }
                }
                break;
            }
        }
        this.setState({
            selectValue: [
                firstSideValue,secondSideValue
            ]
        });
        this.props.setCurrentSide([
            {
                value: firstSideValue,
                label: firstSideLabel
            },
            {
                value: secondSideValue,
                label: secondSideLabel,
                target
            }
        ]);
        console.log('跳转', target);
        this.props.history.push(target);
    }

    onLogout() {
        console.log('退出登录');
        this.props.history.push('/login',{from: this.props.history.location.pathname});
    }
    
    componentDidMount() {
        this.props.getHeaderMenu();
        this.props.getSideMenu();
    }

    render() {
        return (
            <Layout className="App">
                <HeadBar list={this.props.headerMenuList} onChange={this.changeTabMenu} onLogout={this.onLogout}></HeadBar>
                <Layout className="main">
                    <Sider width={200} style={{ background: '#fff' }}>
                        <SideMenu value={this.state.selectValue} defaultValue={this.defaultValue} list={this.props.sideMenuList} onClick={this.changeSideMenu}></SideMenu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {this.props.menuPathInfo.pathNameList.map(item => <Breadcrumb.Item key={'list' + item}>{item}</Breadcrumb.Item>)}
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
                                <Route path={`/`} component={defaultPage.component} exact/>
                                {
                                    pageRouteList.map(item => 
                                        <Route path={`${item.path}`} component={item.component} exact={item.exact} key={item.name}/>
                                    )
                                }
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));
