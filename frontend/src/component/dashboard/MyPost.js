import React, { Component, Fragment } from 'react';
import { Grid, Typography, TextField, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import deletePost from '../../services/PostServices';
// import Edit from './Edit';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
import EditBody from './EditBody'
import Edit from './Edit';

export default class MyPost extends Component {
  state = {
    username: this.props.username,
    idToDelete: "",
    posts: [],
    readyToLoad: false,
    userData: [],
    comment: '',
    setOpen: false,
    open: false,
    data: []
  };

  handleClickOpen = (data) => {
    console.log(data)
    this.setState({ setOpen: true, data: data })
  };

  handleClose = () => {
    this.setState({ setOpen: false })
  };

  componentDidMount() {
    // const datas = [];
    axios.get('http://localhost:4000/to/getPosts')
      .then(response => {
        console.log(response.data)
        for (let index = 0; index < response.data.length; index++) {
          if (response.data[index].user_name === this.state.username) {
            this.state.posts.push(response.data[index]);
            this.setState({ userData: response.data[index].user[0] })
            console.log("Okay")
          } else {
            console.log("NOT")
          }
        }
        this.setState({ readyToLoad: true });
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log(datas);
  }

  deletePostHandle = id => {

    axios.delete('http://localhost:4000/to/deletePost/' + id)
      .then(response => {
        this.setState({
          posts: this.state.posts.filter(el => el._id !== id)
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }



  handleComment = id => {

    const data = {
      comment: this.state.comment,
      comment_from: this.state.userData
    }
    axios.put('http://localhost:4000/to/addComment/' + id, data)
      .then((res) => {
        console.log(res.data)
        console.log('Comment successfully added.')
        this.setState({ comment: '' })
      }).catch((error) => {
        console.log(error)
      })
  }

  loadMyPost = () => {
    if (this.state.readyToLoad) {
      return (
        <center style={{ marginTop: 20, padding: 20, }}>
          <Grid container spacing={10} justify="center">
            {this.state.posts.map(post => (
              <Grid item key={post._id}>
                <div style={{ marginBottom: "20px", marginLeft: "20px", width: '300px', maxWidth: '100%', height: 'auto', maxHeight: '350px' }}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label={post.user_name}>
                          R
                            </Avatar>
                      }
                      action={
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {popupState => (
                            <div>
                                <IconButton variant="contained" {...bindTrigger(popupState)}><MoreVertIcon /></IconButton>
                                <Menu {...bindMenu(popupState)}>
                                  <MenuItem onClick={popupState.close}></MenuItem>
                                  <MenuItem onClick={() => {
                                    popupState.close;
                                    this.deletePostHandle(post._id);

                                  }} >Delete</MenuItem>
                                  <MenuItem onClick={() => {
                                    popupState.close;
                                    this.handleClickOpen({
                                      user: this.state.userData,
                                      title: post.title,
                                      description: post.description,
                                      body: post.body,
                                      id: post.id,
                                    });

                                  }}
                                  >Edit</MenuItem>
                                </Menu>
                            </div>
                          )}
                        </PopupState>
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

                    <CardActions>
                      <Button size="small" color="primary"><FavoriteIcon />Love</Button>
                      <Button size="small" color="primary"><ShareIcon />Share</Button>
                      <IconButton><ExpandMoreIcon /></IconButton>
                    </CardActions>
                    <CardActions disableSpacing>
                    </CardActions>

                    <CardActionArea>
                      <form onSubmit={this.handleSubmit}>
                        <TextField style={{ width: "70%" }} onChange={e => this.setState({ comment: e.target.value })} placeholder="Comment" >
                        </TextField>
                        <Button onClick={() => {
                          this.handleComment(post._id)
                        }}>
                          <Send>Comment</Send>
                        </Button>

                      </form>
                    </CardActionArea>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        </center>
      )
    }
  }


  render() {

    if(this.state.setOpen === false) {
      return (
          <div>{this.loadMyPost()}</div>
        )
    }
    else{
      return(
        <Edit data={this.state.data}></Edit>
      )
    }
  }
}