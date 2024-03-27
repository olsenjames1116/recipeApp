import { useEffect } from 'react';
import api from '../../axiosConfig';

function HomePage() {
	useEffect(() => {
		const authenticateUser = async () => {
			const response = await api.get('/user/authenticate');
			console.log(response);
		};
		authenticateUser();
	});

	return <div>HomePage</div>;
}

export default HomePage;
