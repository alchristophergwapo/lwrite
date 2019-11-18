import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import { UserRegistration, UsernameValidation } from '../services/RegistrationService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';


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
            error: false
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

    onSubmit =async e => {
        e.preventDefault();
        const data = {
            fi: this.state.firstname,
            last_name: this.state.lastname,
            user_name: this.state.user_name,
            password: this.state.password
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
        } else this.setState({
            error: true,
            register: false
        });
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

        const { register, error, user_name_taken } = this.state;
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
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstname"
                                        label="First Name"
                                        name="firstname"
                                        onChange={this.onChange}
                                        value={this.state.firstname}
                                        error={errors.firstname}
                                        className={classnames("", { invalid: errors.firstname })}
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
                                        error={errors.lastname}
                                        className={classnames("", { invalid: errors.lastname })}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        className={classnames("", { invalid: errors.email })}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        className={classnames("", { invalid: errors.password })}
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
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        className={classnames("", { invalid: errors.password2 })}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password2"
                                        label="Confirm Password"
                                        type="password"
                                        id="password2"
                                        autoComplete="another-password"
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

export default Register;
