import React, { Component } from 'react';
import { Card, CardContent, CardActions, Button, TextField, Divider } from '@material-ui/core';
import { addPost } from '../../services/PostServices';
import MyPost from './MyPost';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

export default class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            body: "",
            added: false,
            error: true,
            user: this.props.userData,
            user_name: this.props.username
        }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        const data = {
            user_name: this.state.user_name,
            user: this.state.user,
            title: this.state.title,
            description: this.state.description,
            body: this.state.body,
        };

        const postStatus = await addPost(data);
        if (postStatus === 200) {
            this.setState({
                title: '',
                description: '',
                body: '',
                added: true,
                error: false
            });
        } else {
            this.setState({
                error: true,
                added: false
            });
        }
    }

    render() {
        console.log(this.state.user)
        const modalCard = {
            width: '100%',
            maxWidth: 500,
        }
        const modalCardContent = {
            display: 'flex',
            flexDirection: 'column',
        }
        const marginTop = {
            marginTop: '2vh',
        }
        if (!this.state.added) {
            return (
                <center style={{ marginTop: '5vh' }}>
                    <Card style={modalCard}>
                        <form onSubmit={this.onSubmit}>
                            <CardContent style={modalCardContent}>
                                <TextField
                                    label="Title"
                                    id="title"
                                    onChange={this.onChange}
                                />
                                <TextField
                                    label="What can you say about this?"
                                    multiline rows={3}
                                    id="description"
                                    onChange={this.onChange}
                                />
                                <TextareaAutosize
                                    style={marginTop}
                                    label="Body"
                                    rows={15}
                                    placeholder="Body"
                                    id="body"
                                    required
                                    onChange={this.onChange}
                                />
                                <input accept="image/*" style={useStyles.input} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button size="small" color="primary" onClick={this.onSubmit} endIcon={<DoneIcon>send</DoneIcon>}>Save</Button>
                                <Button size="small" endIcon={<ClearIcon>send</ClearIcon>}>Cancel</Button>
                            </CardActions>
                        </form>
                    </Card>
                </center>

            )
        } else {
            return (
                <MyPost></MyPost>
            )
        }
    }
}

