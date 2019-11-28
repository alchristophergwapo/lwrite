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
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Switch, Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default class MyPost extends Component {
  state = {
    username: this.props.username,
    idToDelete: "",
    posts: [],
    open: false
  };


  componentDidMount() {
    // const datas = [];
    axios.get('http://localhost:4000/to/getPosts/')
      .then(response => {
        for (let index = 0; index < response.data.length; index++) {
          // this.state.posts.push(response.data[index]);
          if (response.data[index].user === this.state.username) {
            this.state.posts.push(response.data[index]);
          }

        }
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log(datas);
  }

  deletePost = async e => {
    const data = {
      id: this.state.idToDelete
    }
    axios.get('http://localhost:4000/to/deletePost/', data)
      .then(response => {
        for (let index = 0; index < this.state.posts.length; index++) {
          if (this.state.posts[index].id === this.state.idToDelete) {
            this.state.posts[index].id.remove();
            console.log(this.state.posts[index])
            console.log(response)
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    console.log(this.state.posts)

    return (

      <center style={{ marginTop: 20, padding: 20, width: 'auto', height: 'auto' }}>
        <Grid container spacing={20} justify="center" >
          {this.state.posts.map(post => (
            <div style={{ marginBottom: 20, marginLeft: 20 }}>
              <Grid item key={post.title}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label={post.user}>
                        R
                          </Avatar>
                    }
                    action={
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {popupState => (
                          <Fragment>
                            <IconButton variant="contained" {...bindTrigger(popupState)}><MoreVertIcon /></IconButton>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem onClick={() => {
                                popupState.close;
                                this.deletePost();
                                this.setState({idToDelete: post._id})
                              }} >Delete</MenuItem>
                              <MenuItem onClick={popupState.close} component={Link} to='/edit'>Edit</MenuItem>
                            </Menu>
                          </Fragment>
                        )}
                      </PopupState>
                    }
                    title={
                      <Typography component="h3">{post.user}</Typography>
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

                  <CardActions>
                    <Button size="small" color="primary"><FavoriteIcon />Love</Button>
                    <Button size="small" color="primary"><ShareIcon />Share</Button>
                    <IconButton><ExpandMoreIcon /></IconButton>
                  </CardActions>
                  <CardActions disableSpacing>
                  </CardActions>

                  <CardActionArea>
                    <form onSubmit={this.handleSubmit}>
                      <TextField style={{ width: "70%" }} onChange={this.handleComment} placeholder="Comment" >
                      </TextField><Button><Send>Comment</Send></Button>

                    </form>
                  </CardActionArea>
                </Card>
              </Grid>
            </div>
          ))}
        </Grid>
      </center>

    );
  }
}