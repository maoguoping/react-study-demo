import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss';
import List from './page/List';
import About from './page/About';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'mgp'
    }
  }
  render() {
    return (
      <Router>
        <Route path="/about" component={About} />
        <Route path="/list" component={List} />
      </Router>
    )
  }
}

export default App;
