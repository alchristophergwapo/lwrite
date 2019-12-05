import React, { Component } from 'react';
import {Card, CardContent,CardActions,Button,TextField} from '@material-ui/core';
import { addPost } from '../../services/PostServices';
import Link from 'react-router-dom';
// import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

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
        console.log(this.state.user)
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
                            <TextField
                                style={marginTop}
                                label="Body"
                                multiline
                                rows={15}
                                id="body"
                                required
                                onChange={this.onChange}
                            />
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={this.onSubmit} component={Link} to="/home">Save</Button>
                            <Button size="small" >Cancel</Button>
                        </CardActions>
                    </form>
                </Card>
            </center>
        )
    }
}

