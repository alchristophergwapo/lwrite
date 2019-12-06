import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
import {Card, CardContent, CardActions} from '@material-ui/core'
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
      profileImg: '',
      first_name: '',
      last_name: '',
      user_name: '',
      password: '',
      password1: ''
    }
  }
  onChange = e => {
    this.setState({[e.target.id] : e.target.value})
  }
  onFileChange(e) {
    // console.log(e.target.files[0].name)
    e.preventDefault();
    this.setState({ profileImg: String(e.target.files[0].name) })
  }

  changeProfilePicture = id => {
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
    return (
      
      <center style={{ marginTop: '5vh' }}>
        <Card style={modalCard}>
          <form onSubmit={e => this.onSubmit(this.state.data.id, e)}>
            <CardContent style={modalCardContent}>
              <div style={useStyles.div}>
                <Grid>
                  <Grid item>
                    <label htmlFor="icon-button-photo">
                      <Avatar alt=" " component="span" src="https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg"

                        style={{
                          columnSpan: "100px",
                          margin: "10px",
                          width: "80px",
                          height: "80px",
                          marginLeft: "10px",
                        }}
                      />
                    </label>
                    <IconButton color="primary" component="span" htmlFor='single'>
                      <PhotoCamera />
                    </IconButton>
                    <input type='file' id='single' onChange={e => this.onFileChange(e)} />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  First name
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField id="first_name" />
                  </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end">
                  Last name <Grid item>
                    <AccountCircle />

                  </Grid>
                  <Grid item><TextField id="last_name" />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  Username
                  <Grid item>
                    <AlternateEmailIcon />
                  </Grid>
                  <Grid item><TextField id="user_name" />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  Password
                  <Grid item>
                    <LockIcon />
                  </Grid>
                  <Grid item>
                    <TextField id="password" type="password" />
                  </Grid>

                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  Password
                  <Grid item>
                    <LockIcon />
                  </Grid>
                  <Grid item>
                    <TextField id="password1" type="password" />
                  </Grid>

                </Grid>
                 </div>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={e => this.changeProfilePicture(userData._id)}><NavigationIcon/>Save</Button>
              <Button size="small" >Cancel</Button>
            </CardActions>
          </form>
        </Card>
      </center>
    )
  }
}