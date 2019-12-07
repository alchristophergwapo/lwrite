import React, { Component, Fragment } from 'react';
import {  } from "@material-ui/core";
import {
  Card, CardActionArea, CardActions, CardContent, Button, CardHeader, Avatar,
  Menu, MenuItem, ExpansionPanel, ExpansionPanelSummary,
  ExpansionPanelDetails, ExpansionPanelActions, Divider, List, ListItem, ListItemText,Grid, 
  Typography, TextField, IconButton, ListItemAvatar
} from '@material-ui/core'
import {
  Send, Favorite as FavoriteIcon, Share as ShareIcon, ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon, Image as ImageIcon
} from '@material-ui/icons'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import axios from 'axios'
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
import Edit from './Edit';
import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';



const usestyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  rootList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

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
        <center style={{ marginTop: 20, padding: 20}}>
          <Grid container spacing={5} justify="center">
            {this.state.posts.map(post => (
              <Grid item key={post._id}>
                <div style={{ marginBottom: "20px", marginLeft: "20px", width: '300px', maxWidth: '100%', height: 'auto', maxHeight: '350px' }}>
                  <Card style ={{border :"3px solid #2196F3"}}>
                    <CardHeader
                      avatar={
                        <Avatar style={{ backgroundColor: "#3F51B5" }} aria-label={post.user_name}>
                          U
                            </Avatar>
                      }
                      action={
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {popupState => (
                            <div>
                              <IconButton variant="contained" {...bindTrigger(popupState)}><MoreVertIcon style={{ color: pink [500] }}/></IconButton>
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
                                    id: post._id,
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
                    <CardActionArea >

                       <div>
                       
                        <CardContent  style={{ border :'3px',backgroundColor:'#EEEEEE'}}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                          </Typography>
                          <Typography component="p">{post.description}</Typography>
                          <Typography component="p">{post.body}</Typography>
                        </CardContent>
                        
                      </div>

                    </CardActionArea>

                    <CardActions style={{ backgroundColor: '#EEEEEE'}}>

                      <ExpansionPanel style={{ backgroundColor: '#90CAF9'}}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon style={{ color: pink [500] }}/>}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Button size="small" ><FavoriteIcon style={{color: pink [500] }}/></Button>
                          <Button size="small" ><ShareIcon style={{ color: pink [500] }}/></Button>
                          <Typography style={usestyles.heading}>Comment</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <List style={usestyles.rootList}>
                            {post.comments.map(comment => (
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar><ImageIcon></ImageIcon></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={comment.comment_from.first_name + " " + comment.comment_from.last_name} secondary={comment.comment} />
                              </ListItem>
                            ))}
                          </List>
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions >
                          <form onSubmit={this.handleSubmit}>
                            <TextField style={{ width: "70%" }} onChange={e => this.setState({ comment: e.target.value })} placeholder="Comment" >
                            </TextField>
                            <Button onClick={() => {
                              this.handleComment(post._id);
                              this.setState({ comment: "" })
                            }}>
                              <Send />
                            </Button>

                          </form>
                        </ExpansionPanelActions>
                      </ExpansionPanel>
                    </CardActions>
                    <CardActions disableSpacing>
                    </CardActions>
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

    if (this.state.setOpen === false) {
      return (
        <div>{this.loadMyPost()}</div>
      )
    }
    else {
      return (
        <Edit data={this.state.data}></Edit>
      )
    }
  }
}