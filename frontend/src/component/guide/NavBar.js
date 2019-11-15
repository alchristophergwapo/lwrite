
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { Home, Book, AccountBox } from '@material-ui/icons'
import Drawer from '@material-ui/core/Drawer';

function NavBar(props) {

    return (
        <Drawer>
            <List component="nav">
                <ListItem component="div" >

                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="h5">
                            <Home />Home
                    </TypoGraphy>
                    </ListItemText>


                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="h5">
                            <Book />Posts
                    </TypoGraphy>
                    </ListItemText>

                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="h5">
                            <AccountBox />Contact
                    </TypoGraphy>
                    </ListItemText>
                </ListItem >

            </List>
        </Drawer>
    )
}


export default NavBar;