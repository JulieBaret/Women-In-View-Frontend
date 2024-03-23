import Axios from 'axios';

// is only used for sign in and sign up, while there is no need to pass a bearer token
const fetchApi = Axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export default fetchApi;