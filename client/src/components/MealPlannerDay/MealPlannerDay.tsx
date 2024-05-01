import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { IPlanner } from '../../types';
import Meal from '../Meal/Meal';
import { addSelectedDay } from '../../redux/state/selectedDaySlice';
import styles from './MealPlannerDay.module.scss';

interface MealPlannerDayProps {
	dayOfTheWeek: string;
	index: number;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents a single day on the meal planner.
function MealPlannerDay({
	dayOfTheWeek,
	index,
	setDisplayMenu,
}: MealPlannerDayProps) {
	const planner = useSelector((state: IRootState) => state.planner.value);

	const today = new Date().getDay();

	const dispatch = useDispatch();

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
		<li
			id={dayOfTheWeek}
			className={`${styles.listItem} ${index === today ? styles.today : ''}`}
			onClick={displayMealPlannerMenu}
			tabIndex={0}
			data-testid={`meal-planner-${dayOfTheWeek}`}
		>
			<span
				className={styles.span}
				data-testid={`meal-planner-span-${dayOfTheWeek}`}
			>{`${dayOfTheWeek[0].toUpperCase()}${dayOfTheWeek.substring(1)}`}</span>
			{planner.find((meal: IPlanner) => meal.day === dayOfTheWeek) ? (
				<Meal dayOfTheWeek={dayOfTheWeek} />
			) : null}
		</li>
	);
}

export default MealPlannerDay;
