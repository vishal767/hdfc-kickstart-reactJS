import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './components';
import { library } from '@fortawesome/fontawesome-svg-core'

import {fab} from '@fortawesome/free-brands-svg-icons'

library.add(fab)
class App extends Component {
  render() {
    return (
      <Router/>
    );
  }
}

export default App;
