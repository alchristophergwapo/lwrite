import axios from 'axios';

export const addPost = data => {
	return axios.post('http://localhost:4000/post/addPost', data)
		.then(res => res.status)
}

