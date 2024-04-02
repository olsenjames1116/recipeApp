import { useDispatch } from 'react-redux';
import { addSelectedDay } from '../../redux/state/selectedDaySlice';
import { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IPlanner } from '../../types';
import Meal from '../Meal/Meal';

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

	const [planner, setPlanner] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const getPlanner = async () => {
			try {
				const response = await api.get('/user/planner');

				setPlanner(response.data.planner);
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

	// Clears the planner of all meals.
	const clearPlanner = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		console.log('clear planner');
	};

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
				<button onClick={clearPlanner}>Clear All</button>
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
							<Meal dayOfTheWeek={dayOfTheWeek} planner={planner} />
						) : null}
					</li>
				);
			})}
		</ul>
	);
}

export default MealPlanner;
