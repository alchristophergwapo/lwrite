import axios from 'axios';

export const addPost = data => {
	return axios.post('http://localhost:4000/to/addPost', data)
		.then(res => res.status)
}

export const getPost = () => (
	axios.get('http://localhost:4000/to/getPosts')
		.then(response => response)
		.catch((error) => {
			console.log(error);
		})
)
