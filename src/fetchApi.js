import Axios from 'axios';

const fetchApi = Axios.create({
	baseURL: "http://localhost:8000/api",
	withCredentials: true,
	//cookies will be sent along with the requests, allowing authenticated requests
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export default fetchApi;