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
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
  withStyles,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete as DeleteIcon} from '@material-ui/icons';

export default class MyPost extends Component {
  state = {
    loading: true,
    posts: [],
    error: null,
  };

//   componentDidMount() {
//     this.getPosts();
//   }

//   async fetch(method, endpoint, body) {
//     try {
//       const response = await fetch(`${API}${endpoint}`, {
//         method,
//         body: body && JSON.stringify(body),
//         headers: {
//           'content-type': 'application/json',
//           accept: 'application/json',
//           authorization: `Bearer ${await this.props.auth.getAccessToken()}`,
//         },
//       });
//       return await response.json();
//     } catch (error) {
//       console.error(error);

//       this.setState({ error });
//     }
//   }

//   async getPosts() {
//     this.setState({ loading: false, posts: (await this.fetch('get', '/posts')) || [] });
//   }

//   savePost = async (post) => {
//     if (post.id) {
//       await this.fetch('put', `/posts/${post.id}`, post);
//     } else {
//       await this.fetch('post', '/posts', post);
//     }

//     this.props.history.goBack();
//     this.getPosts();
//   }

//   async deletePost(post) {
//     if (window.confirm(`Are you sure you want to delete "${post.title}"`)) {
//       await this.fetch('delete', `/posts/${post.id}`);
//       this.getPosts();
//     }
//   }

//   renderAddPost = ({ match: { params: { id } } }) => {
//     if (this.state.loading) return null;
//     const post = find(this.state.posts, { id: Number(id) });

//     if (!post && id !== 'new') return <Redirect to="/posts" />;

//     return <AddPost post={post} onSave={this.savePost} />;
//   };

  render() {
        const posts = {
          marginTop: '3vh'
        }
        const fab = {
          position: 'absolute',
          bottom: "3vh",
          right: "3vh",
          
        }

    return (
      <Fragment>
        <Typography variant="h4">Posts Manager</Typography>
          <Paper elevation={1} style={posts}>
            <List>
                <ListItem>
                  <ListItemText
                  />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            </List>
          </Paper>
          {/* <Typography variant="subtitle1">No posts to display</Typography> */}
        <Route />
          {/* <ErrorSnackbar */}
      </Fragment>
    );
  }
}