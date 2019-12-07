import React, { Fragment, Component } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, ListItem, List,
    InputBase, Fab, Menu, MenuItem } from '@material-ui/core';
import { Book, Add as AddIcon, Search as SearchIcon, } from '@material-ui/icons'
import { Switch, Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import Dashboard from './Dashboard';
import MyPost from './MyPost';
import AddPost from './AddPost';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import MediaCapture from './MediaCapture';
// import ChatList from './chatList/App/index'
import Login from '../login&register/Login';
import Profile from './Profile';
import EditProfile from './EditProfile';
import {makeStyles} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
// import EditBody from './EditBody';

const usestyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

}));
const avatar = {
    backgroundColor: '#3F51B5',
  }

export default class DashboardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            posts: [],
            logout: false
        }
    }

    render() {
        console.log(this.state.user)
        if (this.state.logout) {
            return (
                <Login></Login>
            )
        } if (!this.state.logout) {
            return (
                <Router>
                    <Fragment >
                        <div style={usestyles.root}>
                            <AppBar style={{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'}} position="static">
                                <Toolbar>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="primary-search-account-menu"
                                        aria-haspopup="true"
                                        color="secondary"
                                        // fontSize="30"
                                        component={Link} to='/profile'
                                    >
                                        <Avatar src="https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg"></Avatar>
                                    </IconButton >
                                    <List component="nav">
                                        <ListItem>
                                            <Button  component={Link} to='/home'><HomeOutlinedIcon style={{ fontSize: 40, color: indigo [50] }} />HOME</Button >
                                            <Button  component={Link} to='/post'><Book style={{fontSize: 40,color: indigo [50] }} />POST</Button>
                                            <Fab color="secondary" aria-label="add" component={Link} to="/addPost"style={{ marginLeft :'88%' ,position: 'fixed' }}> <AddIcon /> </Fab>
                                        </ListItem>
                                    </List>

                                </Toolbar>
                            </AppBar>

                           
                               
                        </div>
                        <main
                            style={{ marginTop: '1vh' }}
                        >
                            <Switch>
                                <Route exact path='/home' render={() => <div><Dashboard post={this.state.posts} userData={this.state.user}></Dashboard></div>} />
                                <Route path='/post' render={() => <div><MyPost username={this.state.user.user_name} post={this.state.posts}></MyPost></div>} />
                                <Route path='/profile' render={() => <div><Profile userData={this.state.user}></Profile></div>} />
                                <Route path="editProfile" render={() => <EditProfile></EditProfile>}></Route>
                                <Route path='/addPost' render={() => <div><AddPost userData={this.state.user} username={this.state.user.user_name}></AddPost></div>} />

                                <Redirect from="/login" to="home" ></Redirect>
                            </Switch>
                        </main>
                    </Fragment>
                </Router>
            );
        }
    }
}


