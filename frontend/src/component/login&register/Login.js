import React, { Component } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Paper, InputAdornment, } from '@material-ui/core'
import { AccountCircle, Lock as LockIcon, Done as DoneIcon } from '@material-ui/icons';
import axios from 'axios'
import DashboardHeader from '../dashboard/DashboardHeader'
import { Link } from "react-router-dom";
// import IconButton from '@material-ui/core/IconButton';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      password: '',
      error: false,
      loginSuccess: false,
      user: [],
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleOnClick = async e => {
    const { loginSuccess } = this.state;
    axios.get('http://localhost:4000/authenticate/getUser/' + this.state.user_name)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.setState({ loginSuccess: true, error: false, user: res.data })
          // auth.login(() => {
          //   this.props.history.push("/home");
          // });
        }
        else {
          this.setState({ loginSuccess: false, error: true })
        }
      })
  }
  onSubmit = async e => {
    e.preventDefault();
    const data = {
      user_name: this.state.user_name,
      password: this.state.password
    };

    axios.post('http://localhost:4000/authenticate/login/', data)
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
            // user: res
          });
          this.props.history.push('/');
          // console.log(res)
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });


  }

  render() {
    const { user_name, user } = this.state;
    console.log(user_name)
    const root = {
      height: '100vh'
    }

    const image = {
      backgroundImage: 'url(https://quotefancy.com/media/wallpaper/1600x900/208553-C-S-Lewis-Quote-You-can-make-anything-by-writing.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '980px 850px',
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
      backgroundColor: '#2196F3',
    }
    const form = {
      width: '100%', // Fix IE 11 issue.
      justify: 'center',
      alignItems: 'center',
    }
    const button = {
      width: '20vh',
      marginTop: '3vh',
    }
    const { loginSuccess } = this.state;
    if (!loginSuccess) {
    return (
      <Grid container component="main" style={root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} style={image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div style={paper}>
            <Avatar style={avatar}>
              <AccountCircle />
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle color="primary" />
                        </InputAdornment>
                      ),
                    }}
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  // InputProps={{
                  //   endAdornment:(
                  //     <InputAdornment position="end">
                  //       <IconButton
                  //         aria-label="toggle password visibility"
                  //         onClick={handleClickShowPassword}
                  //         onMouseDown={handleMouseDownPassword}
                  //       >
                  //         {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  //       </IconButton>
                  //     </InputAdornment>
                  //    )
                  // }}

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
                  this.handleOnClick()
                }}
              >
                Login
                  <DoneIcon style={{ marginLeft: '10%', position: 'relative' }} />
              </Button>

              <div style={{ marginTop: '1vh' }}>Don't have an account?
                    <Button variant="outlined" /*color="outlined-primary"*/ style={button}>
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
        <DashboardHeader user_name={user_name}></DashboardHeader>
      )
    }

  }
}


