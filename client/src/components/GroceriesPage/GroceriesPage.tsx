import { useEffect, useRef } from 'react';
import Header from '../Header/Header';
import GroceriesContent from '../GroceriesContent/GroceriesContent';

function GroceriesPage() {
	const inputRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		document.title = 'Groceries';
	}, []);

	return (
		<div>
			<Header />
			<GroceriesContent inputRef={inputRef} />
		</div>
	);
}

export default GroceriesPage;
