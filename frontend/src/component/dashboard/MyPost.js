// import React, {Component} from 'react';

// export default class MyPost extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render(){
//         return(
//             <div>

//             </div>
//         )
//     }
// }

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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class MyPost extends Component {
  state = {
    username: this.props.username,
    posts: [],
  };


  componentDidMount() {
    // const datas = [];
    axios.get('http://localhost:4000/to/getPosts/')
      .then(response => {
        for (let index = 0; index < response.data.length; index++) {
          this.state.posts.push(response.data[index]);
<<<<<<< HEAD
=======
          if (response.data[index].user_name === this.state.username) {
            this.state.posts.push(response.data[index]);
          }
>>>>>>> 74843893aa4d49bae7bb3571b925109fe52b9ef7

        }
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log(datas);
  }
<<<<<<< HEAD
 
=======
>>>>>>> 74843893aa4d49bae7bb3571b925109fe52b9ef7

  render() {
    console.log(this.state.posts)
    return (
<<<<<<< HEAD

      <center style={{ marginTop: 20, padding: 20, width: '300px', height: 'auto' }}>
=======
      <center style={{ marginTop: 20, padding: 20, width: 'auto', height: 'auto' }}>
>>>>>>> 74843893aa4d49bae7bb3571b925109fe52b9ef7
        <Grid container spacing={20} justify="center" >
          {this.state.posts.map(post => (
            <div style={{ marginBottom: 20, marginLeft: 20 }}>
              <Grid item key={post.title}>
                <Card>
                  <CardHeader avatar={
                    <Avatar > W </Avatar>
                  }
                    action={
                      <IconButton><MoreVertIcon /></IconButton>
                    }
                    title="LOVE SUCKS AT ALL"
                    subheader=" December 01,2019"
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
<<<<<<< HEAD
=======

>>>>>>> 74843893aa4d49bae7bb3571b925109fe52b9ef7
                  </CardActionArea>

                  <CardActions>
                    <Button size="small" color="primary">Share</Button>
                    <Button size="small" color="primary">Learn More</Button>
                  </CardActions>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton style={{marginLeft:110}}
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
