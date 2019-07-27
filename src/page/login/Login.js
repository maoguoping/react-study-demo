import React from 'react';
import ReactSVG from 'react-svg'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './Login.scss';
import loginSvg from '../../assets/animate/link.svg'
import LoginBox from '../../components/module/LoginBox/LoginBox';
const WrapedLoginBox = Form.create({ name: 'normal_login' })(LoginBox);
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.loginIn = this.loginIn.bind(this);
        
    }

    loginIn(values) {
        console.log(values);
        this.props.history.push('/home');
    }
    
    render() {
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