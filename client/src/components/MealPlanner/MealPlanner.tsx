import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { addPlanner } from '../../redux/state/plannerSlice';
import MealPlannerDay from '../MealPlannerDay/MealPlannerDay';
import styles from './MealPlanner.module.scss';

interface MealPlannerProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the days of the week to plan meals.
function MealPlanner({ setDisplayMenu }: MealPlannerProps) {
	const daysOfTheWeek = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
	];
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		// Get the user's planner information stored in the db.
		const getPlanner = async () => {
			try {
				const response = await api.get('/user/planner');

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

		getPlanner();
	}, []);

	return (
		<ul className={styles.list} data-testid="meal-planner">
			{daysOfTheWeek.map((dayOfTheWeek, index) => {
				return (
					<MealPlannerDay
						key={index}
						dayOfTheWeek={dayOfTheWeek}
						index={index}
						setDisplayMenu={setDisplayMenu}
					/>
				);
			})}
		</ul>
	);
}

export default MealPlanner;
