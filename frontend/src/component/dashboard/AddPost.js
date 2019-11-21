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

        }
    }
    render() {
        const modal = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
        const modalCard = {
            width: '90%',
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
                                <TextField
                                    style={marginTop}
                                    label="Body"
                                    multiline
                                    rows={4}
                                />
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">Save</Button>
                                <Button size="small" >Cancel</Button>
                            </CardActions>
                        </form>
                    </Card>
                {/* </Modal> */}
            </center>
        )
    }
}

