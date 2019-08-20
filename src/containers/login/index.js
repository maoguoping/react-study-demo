import React from 'react';
import ReactSVG from 'react-svg';
import {Redirect} from 'react-router-dom';
import { Form } from 'antd';
import './style.scss';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as authActions, userInfoSelector} from '../../redux/modules/auth';
import { getAppInfo } from '../../redux/modules/app';
import loginSvg from '../../assets/animate/link.svg'
import LoginBox from '../../components/module/loginBox';
const mapStateToProps = state => {
    return {
        appInfo: getAppInfo(state),
        userInfo: userInfoSelector(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginInAction: bindActionCreators(authActions.login, dispatch),
    }
};
const WrapedLoginBox = Form.create({ name: 'normal_login' })(LoginBox);
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false
        }
        this.loginIn = this.loginIn.bind(this);
    }

    loginIn(data) {
        console.log(data);
        let {username, password} = data;
        this.props.loginInAction(username, password);  
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const userInfo = nextProps.userInfo;
        if (userInfo.userId !== null) {
            sessionStorage.setItem('username', userInfo.username);
            sessionStorage.setItem('userId', userInfo.userId);
            this.setState({
                redirectToReferrer: true
            })
        }
    }
    
    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {redirectToReferrer} = this.state;
        if (redirectToReferrer) {
            return <Redirect to={from}></Redirect>
        }
        return (
            <div className="login-page">
                <div className="login-center-area">
                    <div className="login-svg">
                        <ReactSVG src={loginSvg}/>
                    </div>
                    <WrapedLoginBox loginIn={this.loginIn}></WrapedLoginBox>
                </div>
            </div>
        )
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));