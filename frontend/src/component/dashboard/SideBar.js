import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from "@material-ui/core/Avatar";
import TypoGraphy from '@material-ui/core/Typography'
import { Home, Book} from '@material-ui/icons'
import DashboardHeader from './DashboardHeader';
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import InboxItem from './Inbox';
import Post from './Post';
import MyPost from './MyPost';
import AddPost from './AddPost';
import user from '../login&register/Login'

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function SideBar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <BrowserRouter>
            <Fragment>
                < div className={classes.root} >
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <DashboardHeader></DashboardHeader>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <div style={{ padding: 16, transition: "0.3s" }}>
                                <Avatar
                                    style={{
                                        paddingLeft: '50px',
                                        width: 60,
                                        height: 60,
                                        transition: "0.3s",
                                        backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqU4lsPRiLf3PHLSfUtO-Lqs6dbtwiRtPC8oR4LBRZE8u1EDUY)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                                <div style={{ paddingBottom: 16 }} />
                                <Typography variant={"h6"} noWrap>
                                    {user.first_name} Feliza Banawan
                        </Typography>
                                <Typography color={"textSecondary"} noWrap gutterBottom>
                                    clairefeliz_15@gmail.com
                        </Typography>
                            </div>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />

                        <List component="nav">
                            <ListItem component={Link} to='/home' button>
                                <TypoGraphy color="inherit" >
                                    <Home />Home
                                    </TypoGraphy>
                            </ListItem >
                            <ListItem component={Link} to='/post' button>
                                <TypoGraphy color="inherit" >
                                    <Book />Posts
                                </TypoGraphy>
                            </ListItem>
                            <ListItem component={Link} to='/inbox' button>
                                <TypoGraphy color="inherit" >
                                    <InboxIcon />Inbox
                                </TypoGraphy>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>


                    </Drawer>
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                        style={{marginTop: '10vh'}}
                    >
                        <Switch>
                            <Route exact path='/home' render={() => <div><Post></Post></div>} />
                            <Route path='/post' render={() => <div><MyPost></MyPost></div>} />
                            <Route path='/inbox' render={() => <div><InboxItem></InboxItem></div>} />
                            <Route path='/addPost' render={() => <div><AddPost></AddPost></div>} />
                            <Redirect from="/login" to="home" ></Redirect>
                        </Switch>
                    </main>
                </div >
            </Fragment>
        </BrowserRouter>
    );
}

// import React, { Fragment } from 'react';
// import clsx from 'clsx';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import Avatar from "@material-ui/core/Avatar";
// import TypoGraphy from '@material-ui/core/Typography'
// import { Home, Book} from '@material-ui/icons'
// import DashboardHeader from './DashboardHeader';
// import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
// import InboxItem from './Inbox';
// import Post from './Post';
// import MyPost from './MyPost';
// import AddPost from './AddPost';
// import user from '../login&register/Login'

// const drawerWidth = 300;

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   toolbar: theme.mixins.toolbar,
// }));

// export default function ClippedDrawer() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar
// position="fixed"
// className={clsx(classes.appBar, {
//     [classes.appBarShift]: open,
// })}
// >
// <Toolbar>
//     <IconButton
//         color="inherit"
//         aria-label="open drawer"
//         onClick={handleDrawerOpen}
//         edge="start"
//         className={clsx(classes.menuButton, open && classes.hide)}
//     >
//         <MenuIcon />
//     </IconButton>
//     <DashboardHeader></DashboardHeader>
// </Toolbar>
// </AppBar>
//       <Drawer
                    //     className={classes.drawer}
                    //     variant="persistent"
                    //     anchor="left"
                    //     open={open}
                    //     classes={{
                    //         paper: classes.drawerPaper,
                    //     }}
                    // >
                    //     <div className={classes.drawerHeader}>
                    //         <div style={{ padding: 16, transition: "0.3s" }}>
                    //             <Avatar
                    //                 style={{
                    //                     paddingLeft: '50px',
                    //                     width: 60,
                    //                     height: 60,
                    //                     transition: "0.3s",
                    //                     backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqU4lsPRiLf3PHLSfUtO-Lqs6dbtwiRtPC8oR4LBRZE8u1EDUY)',
                    //                     backgroundRepeat: 'no-repeat',
                    //                     backgroundSize: 'cover',
                    //                     backgroundPosition: 'center',
                    //                 }}
                    //             />
                    //             <div style={{ paddingBottom: 16 }} />
                    //             <Typography variant={"h6"} noWrap>
                    //                 {user.first_name} Feliza Banawan
                    //     </Typography>
                    //             <Typography color={"textSecondary"} noWrap gutterBottom>
                    //                 clairefeliz_15@gmail.com
                    //     </Typography>
                    //         </div>
                    //         <IconButton onClick={handleDrawerClose}>
                    //             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    //         </IconButton>
                    //     </div>
                    //     <Divider />

                    //     <List component="nav">
                    //         <ListItem component={Link} to='/home' button>
                    //             <TypoGraphy color="inherit" >
                    //                 <Home />Home
                    //                 </TypoGraphy>
                    //         </ListItem >
                    //         <ListItem component={Link} to='/post' button>
                    //             <TypoGraphy color="inherit" >
                    //                 <Book />Posts
                    //             </TypoGraphy>
                    //         </ListItem>
                    //         <ListItem component={Link} to='/inbox' button>
                    //             <TypoGraphy color="inherit" >
                    //                 <InboxIcon />Inbox
                    //             </TypoGraphy>
                    //         </ListItem>
                    //     </List>
                    //     <Divider />
                    //     <List>
                    //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    //             <ListItem button key={text}>
                    //                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    //                 <ListItemText primary={text} />
                    //             </ListItem>
                    //         ))}
                    //     </List>


                    // </Drawer>
                    // <main
                    //     className={clsx(classes.content, {
                    //         [classes.contentShift]: open,
                    //     })}
                    //     style={{marginTop: '10vh'}}
                    // >
                    //     <Switch>
                    //         <Route exact path='/home' render={() => <div><Post></Post></div>} />
                    //         <Route path='/post' render={() => <div><MyPost></MyPost></div>} />
                    //         <Route path='/inbox' render={() => <div><InboxItem></InboxItem></div>} />
                    //         <Route path='/addPost' render={() => <div><AddPost></AddPost></div>} />
                    //         <Redirect from="/login" to="home" ></Redirect>
                    //     </Switch>
                    // </main>
//     </div>
//   );
// }