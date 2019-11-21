import React, { Component } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Modal,
    Button,
    TextField,
} from '@material-ui/core';
export default class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            body: "",
            post: [],
        }
    }

    onSubmit = async e => {
        e.preventDefault();
        const data = {
            post: this.state.post
        };

        const registerStatus = await UserRegistration(data);
        if (registerStatus === 200) {
            this.setState({
                firstname: '',
                lastname: '',
                user_name: '',
                password: '',
                register: true,
                error: false
            });
        } else {
            alert("Username already exist");
            this.setState({
                error: true,
                register: false
            });
        }
    }
    render() {
        const modal = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
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

        return (
            <center style={{marginTop: '5vh'}}>
                {/* <Modal style={modal}> */}
                    <Card style={modalCard}>
                        <form>
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
                                <Button size="small" color="primary" onSubmit={onSubmit}>Save</Button>
                                <Button size="small" >Cancel</Button>
                            </CardActions>
                        </form>
                    </Card>
                {/* </Modal> */}
            </center>
        )
    }
}

