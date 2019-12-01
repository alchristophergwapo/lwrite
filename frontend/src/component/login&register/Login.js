import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
import DashboardHeader from '../dashboard/DashboardHeader'
import { Link } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import DoneIcon from '@material-ui/icons/Done';
// import IconButton from '@material-ui/core/IconButton';

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

    axios.get('http://localhost:4000/to/getUser/' + this.state.user_name)
      .then(res => {
        if (res.data != null) {
          this.setState({ loginSuccess: false, error: true, user: res.data })
          console.log(this.state.user)
        }
        else {
          this.setState({ loginSuccess: true, error: false })
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
            user: res
          });
          // console.log(res)
        }
      })


  }

  render() {
    const root = {
      height: '100vh'
    }

    const image = {
      backgroundImage: 'url(http://cm1.narvii.com/6946/adf78c28c6e7ee73f5d55ba9fc59df1a29720e25_00.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      textAlign: 'center',
      backgroundColor: 'white',
    }
    const paper = {
      // marginTop: '5vh',
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
      // marginTop: '3vh',
      justify:'center',
      alignItems:'center',
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
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
                            <LockIcon />
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
                  <DoneIcon style={{marginLeft: '10%', position: 'relative'}}/>
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
        <DashboardHeader user={this.state.user}></DashboardHeader>
      )
    }

  }
}


