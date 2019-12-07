import axios from 'axios';

export const LoginService = data => (
	axios.post('http://localhost:4000/authenticate/login', data)
		.then(res => res.status)
)

export const GetUser = data => (
	axios.get('http://localhost:4000/authenticate/getUser', data)
		.then(res => res)
)
