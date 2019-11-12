import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import SignInSide from './SignInSide';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Login></Login>
    );
  }
}

export default App;
