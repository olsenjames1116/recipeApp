import { useEffect, useRef } from 'react';
import Header from '../Header/Header';
import GroceriesContent from '../GroceriesContent/GroceriesContent';
import styles from './GroceriesPage.module.scss';

// Represents the page to display a grocery list.
function GroceriesPage() {
	const inputMenuRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		document.title = 'Groceries';
	}, []);

	return (
		<div className={styles.page} data-testid="groceries-page">
			<Header location="groceries" />
			<GroceriesContent inputMenuRef={inputMenuRef} />
		</div>
	);
}

export default GroceriesPage;
