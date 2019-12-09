import axios from 'axios';
import bcrypt from 'bcryptjs';
import { GET_ERRORS } from '../authentication/types';

export const UserRegistration = (data, history) => dispatch => {
	const password = data.password;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	data["password"] = hash;

	return axios.post('http://localhost:4000/authenticate/register', data)
		.then(res => {
			res.status;
			history.push('/login')
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		})
}

export const UsernameValidation = data => (
	axios.post('http://localhost:4000/authenticate/validateUsername', data)
		.then(exist => exist.status)
)
