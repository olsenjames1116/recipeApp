import { useEffect } from 'react';
import api from '../../axiosConfig';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import HomeContent from '../HomeContent/HomeContent';

function HomePage() {
	const navigate = useNavigate();

	useEffect(() => {
		const authenticateUser = async () => {
			try {
				await api.get('/user/authenticate');
			} catch (error) {
				// Anything that reaches here is due to an error.
				if (error instanceof AxiosError && error.response?.status === 403) {
					/* 403 error code is sent from backend if user has not been authenticated. 
					Navigate user back to log in page to authenticate. */
					navigate('/log-in');
				} else {
					// A catch all for errors produced from api call.
					console.log(error);
				}
			}
		};

		authenticateUser();
	});

	return (
		<div>
			<Header />
			<HomeContent />
		</div>
	);
}

export default HomePage;
