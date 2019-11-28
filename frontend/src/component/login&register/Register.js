import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import Container from '@material-ui/core/Container';

export default class Register extends Component {
    constructor(props) {
        super(props);

    }
    Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'LWRITE expanding '}
                <Link color="textPrimary" href="https://material-ui.com/">
                    your creative writing
          </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
    render() {
        const body = {
            backgroundImage: 'url(https://images.unsplash.com/photo-1510861320402-285a6c7639ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=669&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '90vh'
        }
        const container = {
          textAlign: 'center', 
          backgroundColor: 'white',
          marginTop: '3vh'
        }
        const paper = {
            marginTop: '5vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
        const avatar = {
            margin: '1vh',
            backgroundColor: 'red',
        }
        const form = {
            width: '100%', // Fix IE 11 issue.
            marginTop: '3vh',
        }
        const submit = {
            margin: '3vh, 0, 2vh',
        }
        return (
            <div style={body}>
                <Container component="main" maxWidth="xs" style={container}>
                    <CssBaseline />
                    <div style={paper}>
                        <Avatar style={avatar}>
                            <CreateIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" color="inherit">Sign up </Typography>
                        <form style={form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={submit}>
                                Sign Up
                            </Button>
                        </form>
                    </div>
                    <Box mt={4}>
                        {this.Copyright()}
                    </Box>
                </Container>
            </div>
        );
    }
}