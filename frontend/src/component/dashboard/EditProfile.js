import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Grid, InputAdornment, CardMedia } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoodIcon from '@material-ui/icons/Mood';
import Button from '@material-ui/core/Button';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios'
import { Card, CardContent, CardActions } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      first_name: '',
      last_name: '',
      user_name: '',
      password: '',
      password1: '',
      image: '',
      imagePreviewUrl: '',
      success: false
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
    console.log(e.target.id +" : " + e.target.value )
  }

  onSubmitChanges = (id ,e ) => {
    e.preventDefault()
    const {password, password1} = this.state;
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      user_name: this.state.user_name,
      password: password,
    }
   
    console.log(data)
    // if (password === password1) {
      axios.post("http://localhost:4000/account/updateAccount/" + id, data)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              first_name: '',
              last_name: '',
              user_name: '',
              password: '',
              success: true,
              userData: res.data
            })
          }
          console.log(res.data)
        })
    // }
  }

  linkcomponent = () => {
    var link = '/post';

    if (this.state.success) {
      return link;
    }
  }
  render() {
    const { userData } = this.state;
    // console.log(this.state.userData)
    const modalCard = {
      width: '100%',
      maxWidth: 500,
    }
    const modalCardContent = {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(187, 222, 251)',
    }
    return (
      <center>
      <Grid style={{ marginTop: '12vh' }} xs={12}>
        <Card style={modalCard}>
        <form onSubmit={(e)=> this.onSubmitChanges(userData._id, e)}>
          <CardContent style={modalCardContent}>
            <Grid item>
              <CardMedia component='img' alt=' ' image={userData.profile_image}
                style={{
                  columnSpan: "100px",
                  margin: "10px",
                  width: "200px",
                  height: "auto",
                  marginLeft: "10px",
                }} />
            </Grid>
            
              <TextField
                id="first_name"
                label="First name"
                id="first_name"
                onChange={this.onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="last_name"
                label="Last name"
                id="last_name"
                onChange={this.onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="username"
                label="Username"
                id="user_name"
                onChange={this.onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="password1" type="password"
                label="Password"
                id="password"
                onChange={this.onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="password2" type="password"
                label="Repeat Password"
                id="password2"
                onChange={this.onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
            <CardActions>
              <Button onClick={ (e)=>
                this.onSubmitChanges(userData._id, e)
              } component={Link}
                to={this.linkcomponent}>Save
              </Button>
              <Button size="small" >Cancel</Button>
            </CardActions>
          </form>
        </Card>
        </Grid>
      </center>
    )
  }
}