import { useEffect, useRef } from 'react';
import Header from '../Header/Header';
import GroceriesContent from '../GroceriesContent/GroceriesContent';

// Represents the page to display a grocery list.
function GroceriesPage() {
	const inputMenuRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		document.title = 'Groceries';
	}, []);

	return (
		<div>
			<Header />
			<GroceriesContent inputMenuRef={inputMenuRef} />
		</div>
	);
}

export default GroceriesPage;
