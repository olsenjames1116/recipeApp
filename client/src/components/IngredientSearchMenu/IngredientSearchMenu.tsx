import { useEffect } from 'react';
import IngredientSearchForm from '../IngredientSearchForm/IngredientSearchForm';
import CloseIcon from '../CloseIcon/CloseIcon';

interface IngredientSearchMenuProps {
	menuRef: React.RefObject<HTMLDivElement>;
	displayMenu: boolean;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

/* Represents the search menu for a user to search for a random recipe 
using the user's ingredients. */
function IngredientSearchMenu({
	menuRef,
	displayMenu,
	setDisplayMenu,
}: IngredientSearchMenuProps) {
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
		<div ref={menuRef}>
			<CloseIcon setDisplayMenu={setDisplayMenu} />
			<span>
				Ingredients in your pantry are marked in green. Select one or many to
				search for recipes that contain those ingredients.
			</span>
			<IngredientSearchForm setDisplayMenu={setDisplayMenu} />
		</div>
	);
}

export default IngredientSearchMenu;
