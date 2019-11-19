import React, { Component,Fragment } from 'react';
import Typography from '@material-ui/core/Typography'
// import CommentIcon from '@material-ui/icons/Comment';
// import ListItem from '@material-ui/core/ListItem';
import Comment from './Comment'
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                    facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                    tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                    consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                    vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                    hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                    tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                    nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.

                </Typography>
               
                <BrowserRouter>
                    <Route
                            path="/"
                            render={({ location }) => (
                        <Fragment>
                             <Tabs value={location.pathname}>
                                        <Tab label="Comment" exact component={Link} to="/comment" /></Tabs>
                            <Switch>
                                <Route exact path='/comment' render={() => <div><Comment></Comment></div>} />
                            </Switch>

                        
                        </Fragment>
                     )}
                 />
                
        </BrowserRouter>
              
    </div>
                )
            }
}