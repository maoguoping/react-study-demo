import React, { useState, useEffect } from 'react';
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
function Login (props) {
    const userInfo = props.userInfo;
    const {from} = props.location.state || {from: {pathname: '/'}};
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    function loginIn(data) {
        console.log(data);
        let {username, password} = data;
        props.loginInAction(username, password);  
    }
    useEffect(() => {
        if (userInfo.userId !== null) {
            setRedirectToReferrer(true);
        }
    },[userInfo.userId]);
    if (redirectToReferrer) {
        return <Redirect to={from}></Redirect>
    } else {
        return (
            <div className="login-page">
                <div className="login-center-area">
                    <div className="login-svg">
                        <ReactSVG src={loginSvg}/>
                    </div>
                    <WrapedLoginBox loginIn={loginIn}></WrapedLoginBox>
                </div>
            </div>
        )
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));