import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import Dashboard from '../dashboard/Dashboard';
// import App from '../guide/App'
import { Container } from '@material-ui/core';
import SideBar from '../dashboard/SideBar';
import { Link } from "react-router-dom";
import LoginService from '../../services/LoginService';
import Message from '../../elements/Message';
import Error from '../../elements/Error';
import {LOGIN_MESSAGE, ERROR_IN_LOGIN } from '../../MessageBundle';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
      loginSuccess: false
    }
  }

  Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'LWrite @ '}
        <Typography color="inherit" href="https://material-ui.com/">
          your service
        </Typography>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  onSubmit = async e => {
    e.preventDefault();
    const data = {
      user_name: this.state.username,
      password: this.state.password
    };

    const loginResult = await LoginService(data);

    if (loginResult !== 200) {
      alert("Unsuccessful")
      this.setState({
        error: true,
        loginSuccess: false
      });
    }
    else {
      alert("Successful")
      this.setState({
        loginSuccess: true,
        error: false
      });
    }
  }

  render() {
    const body = {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }
    const container = {
      backgroundImage: 'url(https://miro.medium.com/max/4800/1*Xzv2lxZv6rN6OoXZfWB6UQ.jpeg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      textAlign: 'center',
      backgroundColor: 'white',
      marginTop: '1vh'
    }
    const paper = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
    const avatar = {
      margin: '1vh',
      backgroundColor: 'red',
    }
    const form = {
      width: '100%', // Fix IE 11 issue.
      marginTop: '3vh',
    }
    const submit = {
      margin: '3vh, 0, 2vh',
    }
    const { loginSuccess, error } = this.state;
    if (!loginSuccess) {
      return (
        <div style={body}>
          <Container component="main" maxWidth="xs" style={container}>
            <CssBaseline />
            <div style={paper}>
              <Avatar style={avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">Login</Typography>
              <form style={form} onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address/Username"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => this.setState({ username: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => this.setState({ password: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={submit}
                  onClick={this.onSubmit}
                >
                  Login
                </Button>
                <Link to="/register">Register</Link>
              </form>
              {loginSuccess && <Message message={LOGIN_MESSAGE} />}
              {error && <Error message={ERROR_IN_LOGIN} />}
            </div>
            <Box mt={4}>
              {this.Copyright()}
            </Box>
          </Container>
        </div>
      )
    } else {
      return (
        <SideBar></SideBar>
      )
    }

  }
}

