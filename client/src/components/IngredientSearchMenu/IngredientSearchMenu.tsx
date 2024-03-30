import { useEffect, useRef } from 'react';
import { closeBlackIcon } from '../../assets/images';

interface IngredientSearchMenuProps {
	displayMenu: boolean;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

/* Represents the search menu for a user to search for a random recipe 
using the user's ingredients. */
function IngredientSearchMenu({
	displayMenu,
	setDisplayMenu,
}: IngredientSearchMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Adds an event listener to hide the ingredient search menu.
		document.addEventListener('mousedown', (event: MouseEvent) => {
			// If the menu is displayed and the event occurred outside of the menu, hide menu.
			if (
				displayMenu &&
				!menuRef.current?.contains(event.currentTarget as Node)
			) {
				setDisplayMenu(false);
			}
		});
	});

	return (
		<div ref={menuRef}>
			<img src={closeBlackIcon} onClick={() => setDisplayMenu(false)} />
		</div>
	);
}

export default IngredientSearchMenu;
