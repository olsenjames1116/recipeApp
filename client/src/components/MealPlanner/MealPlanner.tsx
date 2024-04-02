import { useDispatch } from 'react-redux';
import { addSelectedDay } from '../../redux/state/selectedDaySlice';

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

	const dispatch = useDispatch();

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
		dispatch(
			addSelectedDay(
				`${(event.target as HTMLLIElement).id[0].toUpperCase()}${(
					event.target as HTMLLIElement
				).id.substring(1)}`
			)
		);

		setDisplayMenu(true);
	};

	return (
		<ul>
			<li>
				<button onClick={clearPlanner}>Clear All</button>
			</li>
			{daysOfTheWeek.map((dayOfTheWeek) => {
				return (
					<li
						id={dayOfTheWeek}
						style={{
							height: '200px',
							width: '200px',
							border: '1px solid black',
						}}
						onClick={displayMealPlannerMenu}
					>
						<span>{`${dayOfTheWeek[0].toUpperCase()}${dayOfTheWeek.substring(
							1
						)}`}</span>
					</li>
				);
			})}
		</ul>
	);
}

export default MealPlanner;
