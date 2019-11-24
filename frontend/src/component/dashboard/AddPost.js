import React, { Component } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Modal,
    Button,
    TextField,
} from '@material-ui/core';
import {addPost} from '../../services/AddPostServices';

export default class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            body: "",
            post: [],
            added: false,
            error: true,
            user: this.props.userData,
            username: this.props.username
        }
    }

    onSubmit = async e => {
        e.preventDefault();
        const data = {
            post: {
                user: '',
                title: this.state.title,
                description: this.state.description,
                body: this.state.body,
                background: "",
                date: Date.now()
            }
        };

        const postStatus = await addPost(data);
        if (postStatus === 200) {
            this.setState({
                title: '',
                description: '',
                body: '',
                post: [],
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

        console.log(this.state.user);
        console.log(this.state.username)
        return (
            <center style={{ marginTop: '5vh' }}>
                <Card style={modalCard}>
                    <form onSubmit={this.onSubmit}>
                        <CardContent style={modalCardContent}>
                            <TextField label="Title" />
                            <TextField label="What can you say about this?" multiline rows={3} />
                            <TextField
                                style={marginTop}
                                label="Body"
                                multiline
                                rows={15}
                            />
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={this.onSubmit}>Save</Button>
                            <Button size="small" >Cancel</Button>
                        </CardActions>
                    </form>
                </Card>
            </center>
        )
    }
}

