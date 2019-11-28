import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
// import Dashboard from '../dashboard/Dashboard';
// import App from '../guide/App'
import { Container } from '@material-ui/core';
import SideBar from '../dashboard/SideBar';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
    }
  }

  Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'LWRITE expanding '}
        <Link color="textPrimary" href="https://material-ui.com/">
          your creative writing
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username.length > 0 && password.length > 0) {
      this.setState({ login: true });
      console.log(this.state.login)
    } else{
      alert("Some field are missing")
      this.setState({ login: false })
    }
    console.log(this.state.login);
    console.log(this.state.username);
    console.log(this.state.password)
  }

  render() {
    const body = {
      backgroundImage: 'url(https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '85vh',
    }
    const container = {
      textAlign: 'center',
      backgroundColor: 'white',
    
     
      // marginTop: '1vh'
    }
    const paper = {
      // marginTop: '5vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
    const avatar = {
      // margin: '1vh',
      backgroundColor: 'red',
    }
    const form = {
      width: '100%', // Fix IE 11 issue.
      // marginTop: '3vh',
      justify:'center',
      alignItems:'center',
    }
    const submit = {
      margin: '3vh, 0, 2vh',
    }

    if (!this.state.login) {
      return (
        <div style={body}>
          <Container component="main" maxWidth="xs" style={container}>
            <CssBaseline />
            <div style={paper}>
              <Avatar style={avatar}>
                <CreateIcon />
              </Avatar>
              <Typography component="h1" variant="h5" color="inherit">Login</Typography>
              <form style={form}>
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
                      onChange = {(e) => this.setState({username: e.target.value})}
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
                      onChange = {(e) => this.setState({password: e.target.value})}
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
                  onClick = {(e) => this.handleSubmit(e)}
                  >
                  Login
                </Button>
              </form>
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

