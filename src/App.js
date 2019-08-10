import React from 'react';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import './App.scss';
import './mock/auth';
import './mock/page';
import Home from './containers/home';
import Login from './containers/login';
class App extends React.Component {
    render() {
        return (
           <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/managerCenter" component={Home} />
                    <Route path="/login" component={Login} />
                </Switch>
           </Router>
        )
    }
}

export default App;
