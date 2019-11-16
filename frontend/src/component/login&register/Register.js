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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withRouter } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import {registerUser} from '../../actions/AuthActions';
import { connect } from "react-redux";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: '',
            email: "",
            password: "",
            password2: "",
            errors: {}
        }

    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Your Website
          </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
    render() {
        const body = {
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh'
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

        const { errors } = this.state;
        return (
            <div style={body}>
                <Container component="main" maxWidth="xs" style={container}>
                    <CssBaseline />
                    <div style={paper}>
                        <Avatar style={avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Sign up</Typography>
                        <form style={form} noValidate onSubmit={this.onSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.firstname}
                                        error={errors.firstname}
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        className={classnames("", { invalid: errors.firstname })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.lastname}
                                        error={errors.lastname}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        className={classnames("", { invalid: errors.lastname })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        className={classnames("", { invalid: errors.email })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        className={classnames("", {
                                            invalid: errors.password
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password2"
                                        label="Confirm Password"
                                        type="password"
                                        id="password2"
                                        autoComplete="another-password"
                                        className={classnames("", {
                                            invalid: errors.password2
                                        })}
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
                    <Box mt={5}>
                        {this.Copyright()}
                    </Box>
                </Container>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default Register;