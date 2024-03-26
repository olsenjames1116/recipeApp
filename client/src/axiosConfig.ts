import axios from 'axios';

// Create an axios object to be used for api calls with presets.
const api = axios.create({
	baseURL: import.meta.env.SERVER_URI || 'http://localhost:3000/api',
});

export default api;
