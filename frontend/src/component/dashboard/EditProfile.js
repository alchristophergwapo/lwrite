import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import {Grid ,InputAdornment} from '@material-ui/core';
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
const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 90,
    height: 90,
  },
  inline: {
    display: 'inline',
  },
  margin: {
    margin: theme.spacing(1),
  },
  wrapper: {
    position: 'relative',
  },
  div: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

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
      imagePreviewUrl: ''
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = id => {
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      user_name: this.state.user_name,
      password: this.state.password,
      profile_image: this.profileImg
    }
    axios.post("http://localhost:4000/to/updateProfile/" + id, data)
      .then(res => {
        console.log(res)
      })
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  render() {
    console.log(this.state.profileImg)
    const modalCard = {
      width: '100%',
      maxWidth: 500,
    }
    const modalCardContent = {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(187, 222, 251)',
    }
    const marginTop = {
      marginTop: '2vh',
    }
    const { userData } = this.state;

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<Avatar src={imagePreviewUrl}
        style={{
          columnSpan: "100px",
          margin: "10px",
          width: "150px",
          height: "150px",
          marginLeft: "10px",
        }} />);
    } else {
      $imagePreview = (<Avatar alt=" " component="span" src="https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg"

        style={{
          columnSpan: "100px",
          margin: "10px",
          width: "80px",
          height: "80px",
          marginLeft: "10px",
        }}
      />);
    }
    return (

      <center style={{ marginTop: '5vh' }}>
        <Card style={modalCard}>
          <form onSubmit={e => this.onSubmit(this.state.data.id, e)}>
            <CardContent style={modalCardContent}>
                <Grid>
                  <Grid item>

                    <div className="imgPreview" >
                      {$imagePreview}
                      <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={(e) => this.handleImageChange(e)} />
                      <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </div>

                  </Grid>
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
              <Button size="small" color="primary" onClick={e => this.onSubmit(userData._id)}><NavigationIcon />Save</Button>
              <Button size="small" >Cancel</Button>
            </CardActions>
          </form>
        </Card>
      </center>
    )
  }
}