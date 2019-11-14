import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Dashboard from './Dashboard'
import Register from './Register'
// import { Switch, Route, Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
      register: false
    }
  }

  Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  handleSubmit = (e) => {
    const { username, password } = this.state;
    if (username.length >= 1 && password.length >= 1) {
      this.setState({ login: true })
    } else if (username.length < 1 && password.length < 1) {
      alert("Some field are missing")
      this.setState({login: false})
    }
    console.log(this.state.login);
  }

  handleClick = (e) => {
    this.setState({ register: true })
  }

  render() {
    const root = {
      height: "100vh",
    }

    const image = {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
    const paper = {
      margin: "5vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
    const avatar = {
      margin: "1vh",
      backgroundColor: 'red'
    }
    const form = {
      width: '100%',
      marginTop: '1vh'
    }
    const submit = {
      width: '200px',
      marginBottom: '3vh'
    }

    if (!this.state.login) {
      return (
        <Grid container component="main" style={root} >
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} style={image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div style={paper}>
              <Avatar style={avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
            </Typography>
              <div style={form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address/Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={submit}
                  onClick = {e => this.handleSubmit(e)}
                >
                  Sign In
              </Button>
                <Grid container style={{ marginBottom: '3vh' }}>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                  </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2" onClick={e => this.handleClick(e)}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                  {/* <Switch> */}
                  {/* <Route path="/register" render={() => <Register></Register>} /> */}
                  {/* <Route path="/tab3" render={() => <div>Tab 3</div>} /> */}
                  {/* <Route path="/" render={() => <div>Tab 1</div>} /> */}
                  {/* </Switch> */}
                </Grid>
                <Box>
                  {this.Copyright}
                </Box>
              </div>
            </div>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Dashboard></Dashboard>
      )
    }
  }
}

