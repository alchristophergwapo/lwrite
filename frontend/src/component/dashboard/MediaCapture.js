import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { DropzoneDialog } from 'material-ui-dropzone'
import PhotoCamera from '@material-ui/icons/PhotoCamera';



export default class MediaCapture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }
    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }
    render() {
        return (
            <div>
                <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCamera onClick={this.handleOpen.bind(this)} />

                    </IconButton>
                </label>


                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                    // onSave={this.handleSave}
                />





            </div>
        );
    }
}
