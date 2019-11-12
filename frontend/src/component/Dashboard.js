import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideBar from './SideBar';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <SideBar></SideBar>
                </MuiThemeProvider>
            </div>
        )
    }
}