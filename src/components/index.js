import React, { Component } from 'react';

import styles from './styles';
import StartPage from './startpage';
import { Link, BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router forceRefresh={true}>
      <Switch>
        <Route exact path="/" component={StartPage}/>
      </Switch>
      </Router>
    );
  }
}

export default App;
