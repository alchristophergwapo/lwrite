import React, { Fragment, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar";
import { ListItem } from '@material-ui/core';
import { Book } from '@material-ui/icons'
import { Switch, Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import List from '@material-ui/core/List';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import { Add as AddIcon } from '@material-ui/icons';
import Dashboard from './Dashboard';
import MyPost from './MyPost';
import AddPost from './AddPost';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import ChatList from './chatList/App/index'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Login from '../login&register/Login';
import EditBody from './EditBody';

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
        } if(!this.state.logout) {
            return (
                <Router>
                    <Fragment>
                        <div style={usestyles.root}>
                            <AppBar position="static">
                                <Toolbar>
                                    <PopupState variant="popover" popupId="demo-popup-menu">
                                        {popupState => (
                                            <Router>
                                            <React.Fragment>
                                                <IconButton
                                                    aria-label="account of current user"
                                                    aria-controls="primary-search-account-menu"
                                                    aria-haspopup="true"
                                                    color="secondary"
                                                    fontSize="30"
                                                    {...bindTrigger(popupState)}

                                                >
                                                    <Avatar><AccountCircleIcon /></Avatar>
                                                </IconButton >
                                                <Menu {...bindMenu(popupState)}>
                                                    <MenuItem onClick={popupState.close} component={Link} to='/edit'>Profile</MenuItem>
                                                    <MenuItem onClick={() => {
                                                        popupState;
                                                        this.setState({logout: true})
                                                    }}
                                                    >Logout</MenuItem>
                                                </Menu>
                                            </React.Fragment>
                                            </Router>
                                        )}
                                    </PopupState>
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
                                        <Button variant="contained" color="primary"  style={{ marginLeft: "10%" , paddingTop:"10%", paddingLeft:"20%", paddingRight:"20%"}} component={Link} to='/home'><HomeOutlinedIcon />Home</Button >
                                        <Button variant="contained" color="primary"  style={{ marginLeft: "20%" , paddingTop:"10%", paddingLeft:"20%", paddingRight:"20%"}}component={Link} to='/post'><Book /> Posts</Button>
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
                            style={{ marginTop: '10vh' }}
                        >
                            <Switch>
                                <Route exact path='/home' render={() => <div><Dashboard post={this.state.posts}></Dashboard></div>} />
                                <Route path='/post' render={() => <div><MyPost username={this.state.user.user_name} post={this.state.posts}></MyPost></div>} />
                                {/* <Route path='/users' render={() => <div><ChatList></ChatList></div>} /> */}
                                <Route path='/addPost' render={() => <div><AddPost userData={this.state.user} username={this.state.user.user_name}></AddPost></div>} />
                                <Route path='/edit' render={() => <EditBody></EditBody>}></Route>
                                <Redirect from="/login" to="home" ></Redirect>
                            </Switch>
                        </main>
                    </Fragment>
                </Router>
            );
        }
    }
}


