import React, { Component, Fragment } from 'react';
import { Grid, Typography, TextField, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Send from '@material-ui/icons/Send'
import getPost from '../../services/PostServices'
import axios from 'axios'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default class MyPost extends Component {
  state = {
    username: this.props.username,
    posts: [],
    open: false
  };


  componentDidMount() {
    // const datas = [];
    axios.get('http://localhost:4000/to/getPosts/')
      .then(response => {
        for (let index = 0; index < response.data.length; index++) {
          this.state.posts.push(response.data[index]);
          if (response.data[index].user_name === this.state.username) {
            this.state.posts.push(response.data[index]);
          }

        }
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log(datas);
  }

  handleClick = event => {
    this.setState({ open: true})
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  render() {
    console.log(this.state.posts)
    const options = [
      '',
      'Delete',
      'Edit',
    ];

    return (

      <center style={{ marginTop: 20, padding: 20, width: 'auto', height: 'auto' }}>
        <Grid container spacing={20} justify="center" >
          {this.state.posts.map(post => (
            <div style={{ marginBottom: 20, marginLeft: 20 }}>
              <Grid item key={post.title}>
                <Card>
                  <div>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={this.state.open}
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                    // PaperProps={{
                    //   style: {
                    //     maxHeight: 'auto',
                    //     width: 100,
                    //     position: 'absolute'
                    //   },
                    // }}
                  >
                    {options.map(option => (
                      <MenuItem key={option} selected={option === ''} onClick={this.handleClose}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                  </div>
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
                    <Button size="small" color="primary"><FavoriteIcon />Like</Button>
                    <Button size="small" color="primary"><ShareIcon />Share</Button>
                    <IconButton style={{ marginLeft: 110 }}
                    // className={clsx(classes.expand, {
                    //   [classes.expandOpen]: expanded,
                    // })}
                    // onClick={handleExpandClick}
                    // aria-expanded={expanded}
                    // aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
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