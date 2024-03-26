import axios from 'axios';

// Create an axios object to be used for api calls with presets.
const api = axios.create({
	baseURL: import.meta.env.SERVER_URI || 'http://localhost:3000/api',
});

// // Every response from api passes through here first.
// api.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	// Reached with all errors returned from call to api.
// 	async function (error: Error) {
// 		console.log(error);
// 		return Promise.reject(error);
// 	}
// );

export default api;
