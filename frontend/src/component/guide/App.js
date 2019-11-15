
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import NavBar from './NavBar';


class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <TypoGraphy variant="h5"
                            color="inherit"
                        >
                            My header
           </TypoGraphy>
                    </Toolbar>
                    <NavBar></NavBar>
                </AppBar>

            </div>
        );
    }
}
export default App;