import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import Header from '../Header/Header';
import MealPlannerContent from '../MealPlannerContent/MealPlannerContent';

// Represents the meal planner page.
function MealPlannerPage() {
	const navigate = useNavigate();

	useEffect(() => {
		// Check if a user is authenticated and should have access.
		const authenticateUser = async () => {
			try {
				await api.get('/user/authenticate');
			} catch (error) {
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
			<MealPlannerContent />
		</div>
	);
}

export default MealPlannerPage;
