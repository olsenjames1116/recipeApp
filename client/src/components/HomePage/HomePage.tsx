import { useEffect } from 'react';
import api from '../../axiosConfig';
import Header from '../Header/Header';

function HomePage() {
	useEffect(() => {
		const authenticateUser = async () => {
			const response = await api.get('/user/authenticate');
			console.log(response);
		};
		authenticateUser();
	});

	return (
		<div>
			<Header />
			HomePage
		</div>
	);
}

export default HomePage;
