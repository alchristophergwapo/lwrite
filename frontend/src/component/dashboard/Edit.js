import React, { Component, Fragment } from 'react';
import { Grid, Typography, TextField, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Send from '@material-ui/icons/Send'
import axios from 'axios'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import { Switch, Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import deletePost from '../../services/PostServices';
// import Edit from './Edit';

export default class MyPost extends Component {
  state = {
    username: this.props.username,
    // idToDelete: "",
    posts: [],
    readyToLoad: false,
    userData: []
  };

  loadMyPost = () => {
    console.log(this.state.userData)
      return (
        <center style={{ marginTop: 20, padding: 20, width: 'auto', height: 'auto' }}>
          <Grid container spacing={20} justify="center" >
            {this.state.posts.map(post => (
              <div style={{ marginBottom: 20, marginLeft: 20 }}>
                <Grid item key={post._id}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label={post.user_name}>
                          R
                          </Avatar>
                      }
                      title={
                        <Typography component="h3">{this.state.userData.first_name} {this.state.userData.last_name}</Typography>
                      }
                      subheader="September 14, 2016"
                    />
                    <CardActionArea>
                      <div>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                          </Typography>
                          <Typography component="p">{post.description}</Typography>
                          <Typography component="p">{post.body}</Typography>
                        </CardContent>
                      </div>

                    </CardActionArea>

                    {/* <CardActions>
                      <Button size="small" color="primary"><FavoriteIcon />Love</Button>
                      <Button size="small" color="primary"><ShareIcon />Share</Button>
                      <IconButton><ExpandMoreIcon /></IconButton>
                    </CardActions>
                    <CardActions disableSpacing>
                    </CardActions> */}

                    {/* <CardActionArea>
                      <form onSubmit={this.handleSubmit}>
                        <TextField style={{ width: "70%" }} onChange={this.handleComment} placeholder="Comment" >
                        </TextField><Button><Send>Comment</Send></Button>

                      </form>
                    </CardActionArea> */}
                  </Card>
                </Grid>
              </div>
            ))}
          </Grid>
        </center>
      )
    }
  render() {

    return (

      <div>
        {this.loadMyPost()}
      </div>
    )
  }
}