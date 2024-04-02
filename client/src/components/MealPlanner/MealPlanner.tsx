import { useDispatch, useSelector } from 'react-redux';
import { addSelectedDay } from '../../redux/state/selectedDaySlice';
import { useEffect } from 'react';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IPlanner } from '../../types';
import Meal from '../Meal/Meal';
import { addPlanner } from '../../redux/state/plannerSlice';
import { IRootState } from '../../redux/store';
import ClearPlannerButton from '../ClearPlannerButton/ClearPlannerButton';

interface MealPlannerProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the days of the week to plan meals.
function MealPlanner({ setDisplayMenu }: MealPlannerProps) {
	const daysOfTheWeek = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
	];

	const planner = useSelector((state: IRootState) => state.planner.value);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
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

	// Displays the menu to add meals to the planner.
	const displayMealPlannerMenu = (
		event: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		/* If the planner currently has an item displayed, do not allow the user
		to add another meal on that day. */
		if ((event.target as HTMLLIElement).children.length === 1) {
			dispatch(
				addSelectedDay(
					`${(event.target as HTMLLIElement).id[0].toUpperCase()}${(
						event.target as HTMLLIElement
					).id.substring(1)}`
				)
			);

			setDisplayMenu(true);
		}
	};

	return (
		<ul>
			<li>
				<ClearPlannerButton />
			</li>
			{daysOfTheWeek.map((dayOfTheWeek, index) => {
				return (
					<li
						key={index}
						id={dayOfTheWeek}
						style={{
							height: '500px',
							width: '600px',
							border: '1px solid black',
						}}
						onClick={displayMealPlannerMenu}
					>
						<span>{`${dayOfTheWeek[0].toUpperCase()}${dayOfTheWeek.substring(
							1
						)}`}</span>
						{planner.find((meal: IPlanner) => meal.day === dayOfTheWeek) ? (
							<Meal dayOfTheWeek={dayOfTheWeek} />
						) : null}
					</li>
				);
			})}
		</ul>
	);
}

export default MealPlanner;
