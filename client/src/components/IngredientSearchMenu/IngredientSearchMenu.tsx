import { useEffect } from 'react';
import IngredientSearchForm from '../IngredientSearchForm/IngredientSearchForm';
import CloseIcon from '../CloseIcon/CloseIcon';
import styles from './IngredientSearchMenu.module.scss';

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
		<div ref={menuRef} className={styles.container}>
			<CloseIcon setDisplayMenu={setDisplayMenu} />
			<span className={styles.span}>
				Ingredients in your pantry are marked in{' '}
				<span className={styles.success}>golden brown</span> with an asterisk
				"*". Select one or many to search for recipes that contain those
				ingredients. (You may have to scroll to see more.)
			</span>
			<IngredientSearchForm setDisplayMenu={setDisplayMenu} />
		</div>
	);
}

export default IngredientSearchMenu;
