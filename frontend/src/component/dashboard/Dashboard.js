import React, { Component } from "react";
import { Grid, Typography, CardHeader, TextField, Card, CardActionArea, CardActions, CardContent, CardMedia, 
  Button, Avatar ,ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, 
  ExpansionPanelActions, Divider, List, ListItem, ListItemAvatar,ListItemText} from "@material-ui/core";
import {Send, ExpandMore as ExpandMoreIcon, Favorite as FavoriteIcon, Share as ShareIcon,Image as ImageIcon} from '@material-ui/icons'
import axios from 'axios'
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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          user: [{ first_name: "Developers" }],
          title: "Love Lost",
          description: "This is my first post with more content inside",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUh8Vw2CMarBf4IhzzD9Iu9RDgFDLhampfMmhLqScja8HWYXsL",
          body: "",
          comments: [{
            comment: '',
            comment_from: {
              first_name:'',
              last_name:''
            }
          }]
        },

        {
          user: [{ first_name: "Developers" }],
          title: "Journey",
          description: "This is my second post with more content inside",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQp1PeuwQtnwMQ2r_i0x5ztFzJH0DaePQIIXeOV0N13f4qd4e6S",
          body: "",
          comments: [{
            comment: '',
            comment_from: {
              first_name:'',
              last_name:''
            }
          }]
        },

        {
          user: [{ first_name: "Developers" }],
          title: "Love",
          description: "This is my third post with more content inside",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnP2iCBPQmX_jAx1KQIRRhYBKy_g_3YgQ5tGjDdVV3J3HIQpbF",
          body: "",
          comments: [{
            comment: '',
            comment_from: {
              first_name:'',
              last_name:''
            }
          }]
        },

        {
          user: [{ first_name: "Developers" }],
          title: "You are my reason for life",
          description: "This is my fourth post with more content inside",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRV82se8NdkhIMflZnKFjBTopZO3DZtRMWl-idP271-iPABR9e6",
          body: "",
          comments: [{
            comment: '',
            comment_from: {
              first_name:'',
              last_name:''
            }
          }]
        },

        {
          user: [{ first_name: "Developers" }],
          title: "Allow me",
          description: "This is my fifth post with more content inside",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrfA-ZqxWqS9GeRJ7ameS9XAqAJDwOHx68Gq6tkdZq-wnXZUno",
          body: "",
          comments: [{
            comment: '',
            comment_from: {
              first_name:'',
              last_name:''
            }
          }]
        },

        {
          user: [{ first_name: "Developers" }],
          title: "Closure and A Small Consolation",
          description: "This is my sixth post with more content inside",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRjzBeVVUtSZOV8XyM4ZgjWSuwQK7YW46s0XNyXmXengQ-dRT9",
          body: "",
          comments: [{
            comment: '',
            comment_from: {
              first_name:'',
              last_name:''
            }
          }]
        }
      ],
      readyToLoad: false,
      userData: this.props.userData
    }

  }
  componentDidMount() {
    // const datas = [];
    axios.get('http://localhost:4000/to/getPosts/')
      .then(response => {
        for (let index = 0; index < response.data.length; index++) {
          this.state.posts.push(response.data[index]);
        }
        this.setState({ readyToLoad: true })
      })
      .catch((error) => {
        console.log(error);
      })
    console.log(this.state.posts);
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

  loadPost = () => {
    if (this.state.readyToLoad) {
      return (
        <center style={{ padding: '1vh', backgroundColor: 'rgb(100, 181, 246)' }}>
          <Grid container spacing={5} justify="center" style={{ marginTop: '1vh'}}>
            {this.state.posts.map(post => (
              <Grid item key={post.title}>
                <div style={{ marginBottom: "20px", marginLeft: "10px", width: '300px', maxWidth: '100%' }}>
                  <Card >
                    <CardActionArea >
                      <div>
                        <CardHeader
                          avatar={
                            <Avatar style={{ backgroundColor: "#3F51B5" }} aria-label="">
                              W
                        </Avatar>
                          }
                          title={
                            <Typography component="h3">{post.user.map(data => (data.first_name))} {post.user.map(data => (data.last_name))}</Typography>
                          }
                          subheader={
                            <Typography>

                            </Typography>
                          }
                        />
                        <CardContent>

                          <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                          </Typography>
                          <Typography component="p">{post.description}</Typography>

                        </CardContent>
                      </div>
                      <CardMedia
                        component="img"
                        alt=" "
                        height='auto'
                        image={post.image}
                        title=" "
                        // style={{height: '350px', border: '1px solid black'}}
                      />
                      <Typography style={{ backgroundImage: post.image }}>{post.body}</Typography>
                    </CardActionArea>
                    <CardActions>
                      <ExpansionPanel style={{backgroundColor:"rgb(144, 202, 249)"}} >
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon style={{color: pink [500] }}/>}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Button size="small" ><FavoriteIcon style={{ color: pink [500] }}/></Button>
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
                        <ExpansionPanelActions>
                          <form onSubmit={this.handleSubmit}>
                            <TextField style={{ width: "70%" }} onChange={e => this.setState({ comment: e.target.value })} placeholder="Comment" >
                            </TextField>
                            <Button onClick={() => {
                              this.handleComment(post._id);
                              this.setState({ comment: "" })
                            }}>
                              <Send style={{ color: pink [500] }}>Comment</Send>
                            </Button>

                          </form>
                        </ExpansionPanelActions>
                      </ExpansionPanel>
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
    return (


      <center style={{ marginTop: 10, padding: 20 }}>
        {this.loadPost()}
      </center>

    );
  }
}
