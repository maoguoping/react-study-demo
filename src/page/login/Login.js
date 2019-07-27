import React from 'react';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.loginIn = this.loginIn.bind(this);
    }

    loginIn() {
        this.props.history.push('/home');
    }
    
    render() {
        return (
            <div>
                <div>
                    <label>用户名</label><input name="username"/>
                    <label>密码</label><input name="password"/>
                    <button onClick={this.loginIn}>登陆</button>
                </div>
            </div>
        )
    }
}
export default Login;