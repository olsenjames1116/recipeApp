import { useEffect, useRef } from 'react';
import Header from '../Header/Header';
import MealPlannerContent from '../MealPlannerContent/MealPlannerContent';

// Represents the meal planner page.
function MealPlannerPage() {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.title = 'Meal Planner';
	});

	return (
		<div>
			<Header />
			<MealPlannerContent menuRef={menuRef} />
		</div>
	);
}

export default MealPlannerPage;
