import axios from 'axios';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from '../authentication/types';

export const LoginService = (data) => dispatch => (
	axios.post('http://localhost:4000/authenticate/login', data)
		.then(res => {
			res.status;
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		})
)

export const GetUser = data => (
	axios.get('http://localhost:4000/authenticate/getUser', data)
		.then(res => res)
)

import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}