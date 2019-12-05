import React, { Component } from "react";
import { Grid, Typography, CardHeader, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Send from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';


const usestyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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

  loadPost = () => {
    if (this.state.readyToLoad) {
      return (
        <center style={{ padding: '1vh', backgroundColor: 'rgb(100, 181, 246)' }}>
          <Grid container spacing={10} justify="center" style={{ marginTop: '1vh' }}>
            {this.state.posts.map(post => (
              <Grid item key={post.title}>
                <div style={{ marginBottom: "20px", marginLeft: "20px", width: '300px', maxWidth: '100%', height: 'auto', maxHeight: '70%' }}>
                  <Card>
                    <CardActionArea>
                      <div>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="">
                              R
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
                      />
                      <Typography style={{ backgroundImage: post.image }}>{post.body}</Typography>
                    </CardActionArea>
                    <CardActions>
                      <ExpansionPanel style={{backgroundColor:"rgb(144, 202, 249)"}} >
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Button size="small" color="primary"><FavoriteIcon />Love</Button>
                          <Button size="small" color="primary"><ShareIcon />Share</Button>
                          <Typography style={usestyles.heading}>Comment</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          {post.comments.map(comment => (
                            <div>
                              <CardHeader
                                avatar={
                                  <Avatar aria-label={post.user_name}>
                                    R
                                </Avatar>

                                }
                                title={
                                  <Typography>{comment.comment_from.first_name} {comment.comment_from.last_name}</Typography>
                                }
                              >
                              </CardHeader>
                              <Typography>{comment.comment}</Typography>
                            </div>
                          ))}
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                          <form onSubmit={this.handleSubmit}>
                            <TextField style={{ width: "70%" }} onChange={e => this.setState({ comment: e.target.value })} placeholder="Comment" >
                            </TextField>
                            <Button onClick={() => {
                              this.handleComment(post._id)
                            }}>
                              <Send>Comment</Send>
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
