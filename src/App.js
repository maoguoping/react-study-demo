import React from 'react';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import './App.scss';
import Home from './page/home/Home';
import Login from './page/login/Login';
class App extends React.Component {
    render() {
        return (
           <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                </Switch>
           </Router>
        )
    }
}

export default App;
