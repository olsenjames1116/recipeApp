import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { addPlanner } from '../../redux/state/plannerSlice';

// Represents the button on the planner page that clears the planner.
function ClearPlannerButton() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Clears the planner of all meals.
	const clearPlanner = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		try {
			const response = await api.delete('/user/clear-planner');

			dispatch(addPlanner(response.data.planner));
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

	return <button onClick={clearPlanner}>Clear All</button>;
}

export default ClearPlannerButton;
