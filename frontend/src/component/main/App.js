import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from '../login&register/Login';
import Registration from '../login&register/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/register" component={Registration} />
            <Route exact path="/" component={Login} />
            {/* <ProtectedRoute exact path="/home" component={DashboardHeader} /> */}
            {/* <Route path="*" component={() => "404 NOT FOUND"} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
