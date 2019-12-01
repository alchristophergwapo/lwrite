import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
import SideBar from '../dashboard/SideBar';
import DashboardHeader from '../dashboard/DashboardHeader'
import { Link } from "react-router-dom";
import { LoginService, GetUser } from '../../services/LoginService';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      password: '',
      error: false,
      loginSuccess: false,
      user: []
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleOnClick = async e => {
    
    axios.get('http://localhost:4000/to/getUser/'+this.state.user_name)
		.then(res => {
      if (res.data != null) {
        this.setState({loginSuccess: false, error: true, user: res.data})
        console.log(res.data)
      }
      else{
        this.setState({loginSuccess: true, error:false})
      }
    })
    // console.log(this.state.user)
  }
  onSubmit = async e => {
    e.preventDefault();
    const data = {
      user_name: this.state.user_name,
      password: this.state.password
    };

    axios.post('http://localhost:4000/to/login', data)
		.then(res => {
      if (res.status !== 200) {
        this.setState({
          error: true,
          loginSuccess: false,
        });
      }
      else {
        this.setState({
          loginSuccess: true,
          error: false,
        });
      }
    })

    
  }

  render() {
    const root = {
      height: '100vh'
    }

    const image = {
      backgroundImage: 'url(https://miro.medium.com/max/4800/1*Xzv2lxZv6rN6OoXZfWB6UQ.jpeg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      textAlign: 'center',
      backgroundColor: 'white',
    }
    const paper = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '3vh'
    }
    const avatar = {
      backgroundColor: 'blue',
    }
    const form = {
      width: '100%', // Fix IE 11 issue.
      marginTop: '3vh',
    }
    const button = {
      width: '20vh',
    }
    const { loginSuccess, error } = this.state;
    if (!loginSuccess) {
      return (
        <Grid container component="main" style={root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} style={image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div style={paper}>
              <Avatar style={avatar}>
                <AccountCircleIcon />
              </Avatar>
              <Typography component="h1" variant="h5">Login</Typography>
              <form style={form} onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="user_name"
                      label="Username"
                      name="user_name"
                      autoComplete="user_name"
                      onChange={this.onChange}
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
                      onChange={this.onChange}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="Remember me"
                    />
                  </Grid> */}
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={button}
                  onClick={() => {
                    this.onSubmit;
                    this.handleOnClick()}}
                >
                  Login
                </Button>
                <div style={{ marginTop: '3vh' }}>
                  Don't have an account?
                    <Button variant="outlined" color="outlined-primary" style={button}>
                    <Link to="/register" >Create account</Link>
                  </Button>

                </div>


              </form>
              {/* {loginSuccess && <Message message={LOGIN_MESSAGE} />}
              {error && <Error message={ERROR_IN_LOGIN} />} */}
            </div>
          </Grid>

        </Grid>
      )
    } else {
      return (
        <DashboardHeader user={this.state.user}></DashboardHeader>
      )
    }

  }
}


