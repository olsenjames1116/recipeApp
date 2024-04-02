// import RecipesSidebar from '../RecipesSidebar/RecipesSidebar';
import { useState } from 'react';
import MealPlanner from '../MealPlanner/MealPlanner';
import MealPlannerMenu from '../MealPlannerMenu/MealPlannerMenu';

interface MealPlannerContentProps {
	menuRef: React.RefObject<HTMLDivElement>;
}

// Represents the content displayed on the meal planner page.
function MealPlannerContent({ menuRef }: MealPlannerContentProps) {
	const [displayMenu, setDisplayMenu] = useState(false);

	return (
		<main>
			<MealPlanner setDisplayMenu={setDisplayMenu} />
			{displayMenu && (
				<MealPlannerMenu
					menuRef={menuRef}
					displayMenu={displayMenu}
					setDisplayMenu={setDisplayMenu}
				/>
			)}
		</main>
	);
}

export default MealPlannerContent;
