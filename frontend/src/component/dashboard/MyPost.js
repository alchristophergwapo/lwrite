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
import { Grid, Typography, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Send from '@material-ui/icons/Send'
import getPost from '../../services/PostServices'
import axios from 'axios'

export default class MyPost extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    // const datas = [];
    axios.get('http://localhost:4000/to/getPosts/')
        .then(response => {
            for (let index = 0; index < response.data.length; index++) {
              this.state.posts.push(response.data[index]);
              
            }
        })
        .catch((error) => {
            console.log(error);
        })
    // console.log(datas);
}

  render() {
    // console.log(this.state.posts)
    return (
      <center style={{ marginTop: 20, padding: 20, width: '300px', height: 'auto' }}>
        <Grid container spacing={20} justify="center" >
          {this.state.posts.map(post => (
            <div style={{ marginBottom: 20, marginLeft: 20 }}>
              <Grid item key={post.title}>
                <Card>
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
                    <Button size="small" color="primary">Share</Button>
                    <Button size="small" color="primary">Learn More</Button>
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