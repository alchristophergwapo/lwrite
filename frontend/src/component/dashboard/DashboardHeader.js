import React, { Fragment, Component } from 'react';
import {styles as makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Avatar, ListItem, List,
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
                            <AppBar style={{ backgroundColor: '#2196F3'}} position="static">
                                <Toolbar>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="primary-search-account-menu"
                                        aria-haspopup="true"
                                        color="secondary"
                                        fontSize="30"
                                        component={Link} to='/profile'
                                    >
                                        <Avatar src="https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg"></Avatar>
                                    </IconButton >


                                    <Typography variant="h6" className={usestyles.title}>Lwrite</Typography>
                                    <div className={usestyles.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        usestyles={{
                                            root: usestyles.inputRoot,
                                            input: usestyles.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                    <List component="nav">
                                        <ListItem>
                                            <Button variant="contained" color="primary" style={{ marginLeft: "10%", padding: "1vh", width: '150px', maxWidth: '100%' }} component={Link} to='/home'><HomeOutlinedIcon />Home</Button >
                                            <Button variant="contained" color="primary" style={{ marginLeft: "20%", padding: "1vh", width: '150px', maxWidth: '100%' }} component={Link} to='/post'><Book /> Posts</Button>
                                            {/* <Button variant="contained" color="primary"  style={{ marginLeft: "30%" , paddingTop:"10%", paddingLeft:"20%", paddingRight:"20%"}} component={Link} to='/users'><InboxIcon /> Users</Button> */}
                                        </ListItem>
                                    </List>

                                </Toolbar>
                            </AppBar>

                            <Fab color="secondary" aria-label="add" component={Link} to="/addPost"
                                style={{ position: 'fixed', marginTop: '1vh' }}
                            >
                                <AddIcon />
                            </Fab>
                        </div>
                        <main
                            style={{ marginTop: '1vh' }}
                        >
                            <Switch>
                                <Route exact path='/home' render={() => <div><Dashboard post={this.state.posts}></Dashboard></div>} />
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


