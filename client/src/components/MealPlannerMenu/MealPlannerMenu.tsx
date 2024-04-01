import { useEffect } from 'react';

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
	useEffect(() => {
		// Adds an event listener to hide the ingredient search menu.
		document.addEventListener('mousedown', (event: MouseEvent) => {
			// If the menu is displayed and the event occurred outside of the menu, hide menu.
			if (displayMenu && !menuRef.current?.contains(event.target as Node)) {
				setDisplayMenu(false);
			}
		});
	}, []);

	return <div ref={menuRef}>MealPlannerMenu</div>;
}

export default MealPlannerMenu;
