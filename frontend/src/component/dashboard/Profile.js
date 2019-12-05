import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditProfile from './EditProfile';

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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      edit: false
    }
  }

  editProfile = e => {
    this.setState({edit: true})
  }

  render() {
    const {userData, edit} = this.state;
    if(!edit) {
      return (
        <List style={useStyles.root}>
          <label htmlFor="icon-button-photo">
            <IconButton color="primary" component="span">
  
              <input
  
                type="file"
                style={{ display: "none" }}
              />
  
  
              <Avatar alt=" " component="span" src="https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg"
  
                style={{
                  columnSpan: "100px",
                  margin: "10px",
                  width: "80px",
                  height: "80px",
                  marginLeft: "10px",
                }}
              />
  
            </IconButton>
          </label>
  
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="" src="https://cdn5.vectorstock.com/i/1000x1000/73/39/user-icon-male-person-symbol-profile-avatar-vector-20787339.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={"Username: " +userData.first_name +" "+ userData.last_name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    style={useStyles.inline}
                    color="textPrimary"
                  >
  
                  </Typography>
                  {""}
                </React.Fragment>
              }
            />
          </ListItem>
  
          <Divider variant="inset" component="li" />
          {/* <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="" src="https://www.sunstar.com.ph/uploads/images/2018/11/07/100596.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Location: Cebu City"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    style={useStyles.inline}
                    color="textPrimary"
                  >
  
                  </Typography>
                  {""}
                </React.Fragment>
              }
            />
          </ListItem> */}
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="" src="data:image/jpeg;base64,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CAgICAgICDBCDn3pdcdobkSNqNR0EHa06ljasWjaU2HPfDbipP5QG+8NTWermgysGsDO0esPqM3Uql8U18G/02vx5uqeq3d9nBUa6IFEeiAgIFECiDNECiDFECiDrXNcM1pILRkM8sjN/aPG+G9Z0x2sq6jWY8HPrnu/nJP7muSKzNowZzpcfCP2G5W6UivJz+o1WTPO9uXd2Os1tFmrPSAgICAgICAgICAgICDw+OqCP3vhaCergOTefGaBnPrN0H3HeorYq2XsHSGXF1T1x8/uiV4YWtMVS1vKt2s09rTn4VVe2G0Nvh6Rw5Oc7T8/u4r2kEgggjURQ8FGvRO8bwwvAogICAgIAGpB1rBhy0zUPJ8m3a/o8BpPBSVxWlTza7Bj7d5+XX+ErurCMMVHSfnO9YUaOpuvtqrFcNY59bU5+ksuTqp+mPP/AH9kljhAUzXPqAgICAgICAgICAgICAgICAgUQeHRgoNS13dHKKSRtf8AuaDwqvJrE80mPLfH7kzDjWnB9md4LXR/tefg6qinBWVynSeevPafGPts502Bx4k5HWwH3ghYzp+6VmvS8/8A6p5/hruwTJqmb2scPqsfV570kdL07aywMEy65m/4OT1ee97PS9Phl94sD+VOeyOnvJXsaf5o7dL91PP8OhZsG2ZvhZcnW+g/1os4wVV79KZ55bR+33dmx3TDF/TjazeGivadJUkViOUKWTPkye/aZbrYgFkiewEGUBAQEBAQEBAQEBAQEBAQEBAQEBAQYogZIQMkIFEGaICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg//Z" />
            </ListItemAvatar>
            <ListItemText
              primary={"Email/Username: "+userData.user_name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    style={useStyles.inline}
                    color="textPrimary"
                  >
  
                  </Typography>
                  {''}
                </React.Fragment>
              }
            />
  
          </ListItem>
          {/* <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="" src="https://i.123g.us/c/birth_happybirthday/mtl/birth_happybirthday_mtl_01.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Birthday : November 20, 1996"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    style={useStyles.inline}
                    color="textPrimary"
                  >
  
                  </Typography>
                  {""}
                </React.Fragment>
              }
            />
          </ListItem> */}
  
          <Button variant="contained" size="medium" color="primary" style={useStyles.margin} onClick={this.editProfile}> Edit Profile </Button>
        </List>
  
      );
    } else {
      return(
        <EditProfile userData={userData}></EditProfile>
      )
    }
  }
}