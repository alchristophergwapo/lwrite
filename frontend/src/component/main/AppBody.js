import React, { Component, Fragment } from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Login from '../login&register/Login';
import Register from '../login&register/Register';

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
           
            <BrowserRouter>
            
                <div className="App" >
                    <Route
                        path="/"
                        render={({ location }) => (
                            <Fragment>
                                <center>
                                    <Tabs value={location.pathname}>
                                        <Tab label="Login" exact component={Link} to="/login" />
                                        <Tab
                                            label="Register"
                                            href="#basic-tabs"
                                            component={Link}
                                            to="/register"
                                        />
                                    </Tabs>
                                </center>
                                <Switch>
                                    <Route path="/register" render={() => <div><Register></Register></div>} />
                                    <Route path="/login" render={() => <div><Login></Login></div>} />
                                </Switch>
                            </Fragment>
                        )}
                    />
                </div>
          
            </BrowserRouter>
          
           
        )
    }
}
