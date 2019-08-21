import React from 'react'
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import './App.scss'
import initMock from './mock'
import Home from './containers/home'
import Login from './containers/login'
import NotFound from './containers/notfound'
initMock();
function App () {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/managerCenter" component={Home} />
                <Route path="/login" component={Login} />
                <Route component={NotFound}></Route>
            </Switch>
        </Router>
    )
}
export default App;
