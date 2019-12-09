import React, { Component, Fragment } from 'react';
import { } from "@material-ui/core";
import {
  Card, CardActionArea, CardActions, CardContent, Button, CardHeader, Avatar,
  Menu, MenuItem, ExpansionPanel, ExpansionPanelSummary, CardMedia,
  ExpansionPanelDetails, ExpansionPanelActions, Divider, List, ListItem, ListItemText, Grid,
  Typography, TextField, IconButton, ListItemAvatar
} from '@material-ui/core'
import {
  Send, Favorite as FavoriteIcon, Share as ShareIcon, ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon, Image as ImageIcon
} from '@material-ui/icons'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import axios from 'axios'
import Edit from './Edit';
import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import NavigationIcon from '@material-ui/icons/Navigation';

const usestyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    height: 'auto',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

export default class MyPost extends Component {
  state = {
    username: this.props.username,
    idToDelete: "",
    posts: [],
    readyToLoad: false,
    comment: '',
    setOpen: false,
    open: false,
    data: [],
    user: this.props.userData,
    edit: false
  };

  componentWillMount() {
    // const datas = [];
    axios.get('http://localhost:4000/post/getPosts')
      .then(response => {
        console.log(response.data)
        for (let index = 0; index < response.data.length; index++) {
          if (response.data[index].user_name === this.state.username) {
            this.state.posts.push(response.data[index]);
            this.setState({ readyToLoad: true })
            // console.log("Okay")
          } else {
            // console.log("NOT")
          }
        }
        this.setState({ readyToLoad: true });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePostHandle = id => {
    axios.delete('http://localhost:4000/post/deletePost/' + id)
      .then(response => {
        this.setState({
          posts: this.state.posts.filter(el => el._id !== id)
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onSubmitProfile = username => {
    const formData = new FormData()
    formData.append('profile_image', this.state.image)
    axios.post('http://localhost:4000/account/updateProfileImage/' + username, formData)
      .then(res => {
        this.setState({
          image: "",
          userData: res.data,
        });
        console.log(res)
      })
      .catch(err => {
        this.setState({
          error: true,
          added: false
        });
        console.log(err)
      })

  }

  handleClickOpen = data => {
    console.log(data)
    this.setState({edit : true})
    return(
      <Edit data={data}>

      </Edit>
    )
  }

  handleComment = id => {
    const data = {
      comment: this.state.comment,
      comment_from: this.state.userData
    }
    axios.put('http://localhost:4000/post/addComment/' + id, data)
      .then((res) => {
        console.log(res.data)
        console.log('Comment successfully added.')
        this.setState({ comment: '' })
      }).catch((error) => {
        console.log(error)
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
    const { user, username, readyToLoad ,posts} = this.state;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    let $preview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <div>
          <CardMedia component='img' alt=" " image={imagePreviewUrl}
            style={{
              columnSpan: "100px",
              margin: "10px",
              width: "200px",
              height: "auto",
              marginLeft: "10px",
            }} />
          <Button size="small" color="primary" onClick={() => this.onSubmitProfile(username)}><NavigationIcon />Save</Button>
        </div>
      );
    } else {
      $imagePreview = (<div><CardMedia component="img" image={this.state.user.profile_image}
        style={{
          columnSpan: "100px",
          margin: "10px",
          width: "200px",
          height: "auto",
          marginLeft: "10px",
        }}
      />
      </div>
      );
    }

    if (readyToLoad) {
      $preview = (
        <div style={{ padding: '1vh' }}>
          <Grid container spacing={2} justify="center" item xs={12} >
            {this.state.posts.map(post => (
              <Grid item key={post._id}>
                <Card style={{ border: "3px solid #2196F3", marginBottom: '10px', marginLeft: "20px", marginBottom: "5px", marginLeft: "5px", width: '300px', maxWidth: '100%' }}>
                  <CardHeader
                    avatar={
                      <Avatar src={post.profile_image} style={{ backgroundColor: "#3F51B5" }} aria-label={post.user_name}>
                      </Avatar>
                    }
                    action={
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {popupState => (
                          <div>
                            <IconButton variant="contained" {...bindTrigger(popupState)}><MoreVertIcon style={{ color: pink[500] }} /></IconButton>
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
                              component={Link} to='/editPost'

                              >Edit</MenuItem>
                            </Menu>
                          </div>
                        )}
                      </PopupState>
                    }
                    title={
                      <Typography component="h3">{this.state.user.first_name} {this.state.user.last_name}</Typography>
                    }
                    subheader="September 14, 2016"
                  />
                  <CardActionArea >
                    <div>
                      <CardContent style={{ border: '3px', backgroundColor: '#EEEEEE' }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {post.title}
                        </Typography>
                        <Typography component="p">{post.description}</Typography>
                        <CardMedia
                          component="img"
                          alt=" "
                          height='auto'
                          image={post.background_image}
                          title=" "
                        // style={{height: '350px', border: '1px solid black'}}
                        />
                        <Typography component="p">{post.body}</Typography>
                      </CardContent>
                    </div>
                  </CardActionArea>
                  <CardActions style={{ backgroundColor: '#EEEEEE' }}>

                    <ExpansionPanel style={{ backgroundColor: '#90CAF9' }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon style={{ color: pink[500] }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Button size="small" ><FavoriteIcon style={{ color: pink[500] }} /></Button>
                        <Button size="small" ><ShareIcon style={{ color: pink[500] }} /></Button>
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
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )
    }
    if(!this.state.edit) {
      return (
        <center style={{ marginTop: 20, padding: 20, marginTop: '12vh' }}>
          <Grid>
            <Paper>
              <Grid item>
                <div className="imgPreview" >
                  <form onSubmit={this.onSubmitProfile}>
                    {$imagePreview}
                    <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={(e) => this.handleImageChange(e)} />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </form>
                </div>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography variant="h3" gutterBottom >
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      {user.user_name}
                    </Typography>
  
                  </Grid>
                  <Grid item xs>
                    <Button component={Link} to='/editProfile' variant="contained" size="medium" color="primary" style={usestyles.margin} onClick={this.editProfile}> Edit Account </Button>
                  </Grid>
                </Grid>
  
              </Grid>
  
            </Paper>
          </Grid>
          <Grid >
            {$preview}
          </Grid>
        </center>
      )
    }
    if(this.state.edit) {
      return(
        <div>
        {this.handleClickOpen}
        </div>
      )
    }
  }
}

