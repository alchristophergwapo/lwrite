import React, { Fragment, Component } from 'react';
import {
    AppBar, Toolbar, Typography, Button, IconButton, Avatar, ListItem, List,
    InputBase, Fab, Menu, MenuItem
} from '@material-ui/core';
import { Book, Add as AddIcon, Search as SearchIcon, Edit, } from '@material-ui/icons'
import { Switch, Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import Dashboard from './Dashboard';
import MyPost from './MyPost';
import AddPost from './AddPost';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import axios from 'axios';
// import ChatList from './chatList/App/index'
import Login from '../login&register/Login';
import EditProfile from './EditProfile'
import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import AddPostImage from './AddPostImage';
import EditPost from './Edit'
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
            user: [],
            posts: [],
            logout: false,
            user_name: this.props.user_name
        }
    }

    componentWillMount() {
        axios.get('http://localhost:4000/authenticate/getUser/' + this.state.user_name)
            .then(res => {
                if (res.data != null) {
                    this.setState({ user: res.data })
                }
                
            })
    }

    render() {
        const { user } = this.state;
        console.log(user)
        if (this.state.logout) {
            return (
                <Login></Login>
            )
        } if (!this.state.logout) {
            return (
                <Router>
                    <Fragment >
                        <div style={usestyles.root}>
                            <AppBar style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }} position="fixed">
                                <Toolbar>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="primary-search-account-menu"
                                        aria-haspopup="true"
                                        color="secondary"
                                        // fontSize="30"
                                        component={Link} to='/post'
                                        style={{ marginLeft: '5%', marginRight: '5%' }}
                                    >
                                        <Avatar src={user.profile_image}></Avatar>
                                    </IconButton >
                                    <List component="nav">
                                        <ListItem>
                                            <Button component={Link} to='/home'><HomeOutlinedIcon style={{ marginRight: '5%', fontSize: 40, color: indigo[50] }} />HOME</Button >
                                            {/* <Button  component={Link} to='/post'><Book style={{fontSize: 40,color: indigo [50] }} />POST</Button> */}
                                            <Fab color="secondary" aria-label="add" component={Link} to="/addPost" style={{ marginLeft: '5%', marginRight: '5%', position: '//#endregion' }}> <AddIcon /> </Fab>
                                        </ListItem>
                                    </List>

                                </Toolbar>
                            </AppBar>



                        </div>
                        <main
                            style={{ marginTop: '7vh' }}
                        >
                            <Switch>
                                <Route exact path='/home' render={() => <div><Dashboard post={this.state.posts} userData={user}></Dashboard></div>} />
                                <Route exact path='/post' render={() => <div><MyPost username={user.user_name} userData={user}></MyPost></div>} />
                                <Route exact path="/editProfile" render={() => <EditProfile userData={user} style={{marginTop: '7vh'}}></EditProfile>}></Route>
                                <Route exact path='/addPost' render={() => <div><AddPost userData={user} username={user.user_name} style={{marginTop: '7vh'}}> </AddPost></div>} />
                                <Route exact path="/uploadImage" render={() => <AddPostImage userData={user} username={user.user_name} style={{marginTop: '7vh'}}></AddPostImage>} />
                                <Route exact path='/editPost' render={() => <EditPost data={this.props.data}></EditPost>}></Route>
                                <Redirect from="/" to="home" ></Redirect>
                            </Switch>
                        </main>
                    </Fragment>
                </Router>
            );
        }
    }
}


