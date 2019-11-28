import React, { Component, Fragment } from 'react';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Login from '../login&register/Login';
import Register from '../login&register/Register';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button'
export default class AppBody extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const body = { 
            backgroundImage : 'url(https://miro.medium.com/max/4800/1*Xzv2lxZv6rN6OoXZfWB6UQ.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            
        }
        return (
            <div style={body}>
            <BrowserRouter>
                <Fragment className="App">
                    <List component="nav">
                        <Button color ="secondary" component={Link} to='/login' >
                        Login
                        </Button>
                        <Button color ="secondary" component={Link} to='/register' >
                            Register
                        </Button>
                    </List>

                    <List>
                        <Switch>
                            <Route exact path='/login' render={() => <div><Login></Login></div>}></Route>
                            <Route path='/register' render={() => <div><Register></Register></div>}></Route>
                        </Switch>
                    </List>
                </Fragment>


            </BrowserRouter>
        </div>
        )
    }
}
