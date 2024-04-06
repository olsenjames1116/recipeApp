import { useEffect, useRef } from 'react';
import Header from '../Header/Header';
import MealPlannerContent from '../MealPlannerContent/MealPlannerContent';
import styles from './MealPlannerPage.module.scss';

// Represents the meal planner page.
function MealPlannerPage() {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.title = 'Meal Planner';
	});

	return (
		<div className={styles.page}>
			<Header location="planner" />
			<MealPlannerContent menuRef={menuRef} />
		</div>
	);
}

export default MealPlannerPage;
