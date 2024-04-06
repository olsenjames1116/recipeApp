import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import MealPlannerForm from '../MealPlannerForm/MealPlannerForm';
import MealPlannerRecipes from '../MealPlannerRecipes/MealPlannerRecipes';
import MealPlannerSearchResults from '../MealPlannerSearchResults/MealPlannerSearchResults';
import CloseIcon from '../CloseIcon/CloseIcon';
import styles from './MealPlannerMenu.module.scss';

interface MealPlannerMenuProps {
	menuRef: React.RefObject<HTMLDivElement>;
	displayMenu: boolean;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the menu to search and add recipes to planner.
function MealPlannerMenu({
	menuRef,
	displayMenu,
	setDisplayMenu,
}: MealPlannerMenuProps) {
	const selectedDay = useSelector(
		(state: IRootState) => state.selectedDay.value
	);
	const recipesQuery = useSelector(
		(state: IRootState) => state.recipesQuery.value
	);

	useEffect(() => {
		// Adds an event listener to hide the ingredient search menu.
		document.addEventListener('mousedown', (event: MouseEvent) => {
			// If the menu is displayed and the event occurred outside of the menu, hide menu.
			if (displayMenu && !menuRef.current?.contains(event.target as Node)) {
				setDisplayMenu(false);
			}
		});
	}, []);

	return (
		<div ref={menuRef} className={styles.container}>
			<CloseIcon setDisplayMenu={setDisplayMenu} />
			<span className={styles.span}>{selectedDay}</span>
			<MealPlannerForm />
			{recipesQuery.length === 0 ? (
				<MealPlannerRecipes setDisplayMenu={setDisplayMenu} />
			) : (
				<MealPlannerSearchResults setDisplayMenu={setDisplayMenu} />
			)}
		</div>
	);
}

export default MealPlannerMenu;
