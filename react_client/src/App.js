

import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }
  checkAuth = e => {
    const { token } = JSON.parse(localStorage.getItem('token'));
    if(!token) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Switch>
            <Route path="/registration" onEnter={this.checkAuth}>
              <Registration />
            </Route>
            <Route path="/login" onEnter={this.checkAuth}>
              <Login />
            </Route>
            <Route path="/" onEnter={this.checkAuth}>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
