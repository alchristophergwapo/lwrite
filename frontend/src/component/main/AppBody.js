import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from '../login&register/Login';
import Registration from '../login&register/Register';

export default class AppBody extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // const body = {
        //     backgroundImage: 'url(http://bookytheblog.com/wp-content/uploads/2017/04/Creativity-is-not-a-talent-it-is-a-way-of-operating.jpg)',
        //     backgroundRepeat: 'no-repeat',
        // }
        return (

            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/register" component={Registration} />
                        <Route exact path="/login" component={Login} />
                        <Redirect from="/" to="login" />
                    </Switch>
                </div>
            </Router>


        )
    }
}
