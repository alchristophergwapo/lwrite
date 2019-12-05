import React, { Component } from 'react';
import { Card, CardContent, CardActions, Button, TextField } from '@material-ui/core';
import Link from 'react-router-dom';
import axios from 'axios'
import MyPost from './MyPost';
// import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      data: this.props.data,
      updated: false
    }
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (id, e) => {
    console.log(id)
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      body: this.state.body,
    };
    console.log(data);

    axios.post('http://localhost:4000/to/updatePost/' + id, data)
      .then(res => {
        console.log(res.data);
        this.setState({
          title: '',
          description: '',
          body: '',
          updated: true
        })
      });

  }

  render() {
    const modalCard = {
      width: '100%',
      maxWidth: 500,
    }
    const modalCardContent = {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(187, 222, 251)',
    }
    const marginTop = {
      marginTop: '2vh',
    }
    if (!this.state.updated) {
      return (
        <center style={{ marginTop: '5vh' }}>
          <Card style={modalCard}>
            <form onSubmit={e => this.onSubmit(this.state.data.id,e)}>
              <CardContent style={modalCardContent}>
                <TextField
                  label="Title"
                  id="title"
                  onChange={this.onChange}
                  placeholder={this.state.data.title}
                  />
                <TextField
                  label="What can you say about this?"
                  multiline rows={3}
                  id="description"
                  onChange={this.onChange}
                  placeholder={this.state.data.description}
                  />
                <TextField
                  style={marginTop}
                  label="Body"
                  multiline
                  rows={15}
                  id="body"
                  required
                  onChange={this.onChange}
                  placeholder={this.state.data.body}
                  />
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={e => this.onSubmit(this.state.data.id,e)}>Save</Button>
                <Button size="small" >Cancel</Button>
              </CardActions>
            </form>
          </Card>
        </center>
      )
    } else {
      return(
        <MyPost></MyPost>
      )
    }
  }
}

