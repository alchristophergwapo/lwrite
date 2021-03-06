import React, { Component } from 'react';
import { Card, CardContent, CardActions, Button, TextField, Divider, CardMedia, Grid } from '@material-ui/core';
import MyPost from './MyPost';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

export default class AddPostImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            added: false,
            error: true,
            user: this.props.userData,
            user_name: this.props.username,
            image: '',
            imagePreviewUrl: ''
        }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('background_image', this.state.image)
        formData.append("title", this.state.title)
        formData.append("description", this.state.description)
        formData.append("first_name", this.state.user.first_name)
        formData.append("last_name", this.state.user.last_name)
        formData.append("user_name", this.state.user_name)
        formData.append("profile_image", this.state.user.profile_image)

        axios.post('http://localhost:4000/post/uploadPostImage', formData)
            .then(res => {
                this.setState({
                    title: '',
                    body: '',
                    added: true,
                    error: false,
                    image: ""
                });
                console.log(res)
            })
            .catch(err => {
                this.setState({
                    error: true,
                    added: false
                });
                console.log(err)
            })

    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                image: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        const { user } = this.state;
        console.log("first name : ", user.first_name)
        console.log("last name : ", user.last_name)
        const modalCard = {
            width: '100%',
            maxWidth: 500,
        }
        const modalCardContent = {
            display: 'flex',
            flexDirection: 'column',
        }

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<CardMedia component='img' alt=' ' src={imagePreviewUrl} style={{ width: '450px', maxWidth: '100%', height: 'auto' }} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <center style={{ marginTop: '5vh' }}>
                <Grid style={{ marginTop: '12vh' }} xs={12}>
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
                                <div className="imgPreview" >
                                    {$imagePreview}
                                </div>
                                <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={(e) => this.handleImageChange(e)} />
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
                </Grid>
            </center>
        )
    }
}

