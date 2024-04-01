import { useDispatch } from 'react-redux';
import { addSelectedDay } from '../../redux/state/selectedDaySlice';

interface MealPlannerProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the days of the week to plan meals.
function MealPlanner({ setDisplayMenu }: MealPlannerProps) {
	const height = '200px';
	const width = '200px';

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
			<li
				id="monday"
				style={{ height: height, width: width, border: '1px solid black' }}
				onClick={displayMealPlannerMenu}
			>
				Monday
			</li>
			<li
				id="tuesday"
				style={{ height: height, width: width, border: '1px solid black' }}
				onClick={displayMealPlannerMenu}
			>
				Tuesday
			</li>
			<li
				id="wednesday"
				style={{ height: height, width: width, border: '1px solid black' }}
				onClick={displayMealPlannerMenu}
			>
				Wednesday
			</li>
			<li
				id="thursday"
				style={{ height: height, width: width, border: '1px solid black' }}
				onClick={displayMealPlannerMenu}
			>
				Thursday
			</li>
			<li
				id="friday"
				style={{ height: height, width: width, border: '1px solid black' }}
				onClick={displayMealPlannerMenu}
			>
				Friday
			</li>
			<li
				id="saturday"
				style={{ height: height, width: width, border: '1px solid black' }}
				onClick={displayMealPlannerMenu}
			>
				Saturday
			</li>
			<li
				id="sunday"
				style={{ height: height, width: width, border: '1px solid black' }}
				onClick={displayMealPlannerMenu}
			>
				Sunday
			</li>
		</ul>
	);
}

export default MealPlanner;
