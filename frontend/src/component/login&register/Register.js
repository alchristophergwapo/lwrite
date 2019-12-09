import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
// import axios from 'axios';
import { UserRegistration, UsernameValidation } from '../../services/RegistrationService';
import Login from './Login';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';
import {connect} from 'reaact-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: '',
            user_name: "",
            password: "",
            password2: "",
            register: false,
            error: false,
            errors: {}
        }

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleOnBlur = async e => {
        this.setState({
            user_name: e.target.value
        });
        const data = {
            user_name: this.state.user_name
        };
        const isUsernameTaken = await UsernameValidation(data);

        isUsernameTaken === 204
            ? this.setState({ user_name_taken: true })
            : this.setState({ user_name_taken: false });
    }

    onSubmit = async e => {
        e.preventDefault();
        const data = {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            user_name: this.state.user_name,
            password: this.state.password
        };

        if (this.state.password === this.state.password2) {
            const registerStatus = await UserRegistration(data, this.props.history);
            if (registerStatus === 200) {
                console.log("Successfull")
                this.setState({
                    firstname: '',
                    lastname: '',
                    user_name: '',
                    password: '',
                    password2: '',
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
        else {
            alert("Password don't match")
        }
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const root = {
            height: '100vh'
        }
        const image = {
            backgroundImage: 'url(https://images.unsplash.com/photo-1510861320402-285a6c7639ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh'
        }

        const paper = {
            // marginTop: '5vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '3vh'
        }
        const avatar = {
            backgroundColor: '#2196F3',
        }
        const form = {
            width: '100%', // Fix IE 11 issue.
            marginTop: '3vh',
        }
        const button = {
            width: '20vh',
            marginTop: '3vh'
        }

        const { register, user_name_taken } = this.state;
        if (!register) {
            return (
                <Grid container component="main" style={root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} style={image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div style={paper}>
                            <Avatar style={avatar}>
                                <AccountCircleIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">Sign up</Typography>
                            <form style={form} noValidate onSubmit={this.onSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstname"
                                            label="First Name"
                                            name="firstname"
                                            onChange={this.onChange}
                                            value={this.state.firstname}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <CreateIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastname"
                                            label="Last Name"
                                            name="lastName"
                                            onChange={this.onChange}
                                            value={this.state.lastname}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <CreateIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            onChange={this.onChange}
                                            value={this.state.user_name}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="user_name"
                                            label="Username"
                                            name="user_name"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <p>{user_name_taken}</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            value={this.state.password2}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password2"
                                            label="Confirm Password"
                                            type="password"
                                            id="password2"
                                            autoComplete="another-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    classnames="btn btn-primary"
                                    style={button}
                                    onClick={this.handleRegister}
                                >
                                    Sign Up
                                    <DoneIcon style={{ marginLeft: '10%', position: 'relative' }} />
                                </Button>
                                <div>
                                    <div style={{ marginTop: '1vh' }}>Already have an account?
                                            <Button variant="outlined">
                                            <Link to="/">Cancel</Link>
                                        </Button>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </Grid >
                </Grid>
            );
        } else {
            return (
                <Login></Login>
            )
        }
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))
