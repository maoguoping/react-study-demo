import React from 'react';
import ReactSVG from 'react-svg';
import {Redirect} from 'react-router-dom';
import { Form } from 'antd';
import './Login.scss';
import loginSvg from '../../assets/animate/link.svg'
import LoginBox from '../../components/module/LoginBox/LoginBox';
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
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        this.setState({
            redirectToReferrer: true
        })
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
export default Login;