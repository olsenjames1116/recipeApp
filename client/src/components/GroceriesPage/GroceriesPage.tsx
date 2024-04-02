import { useEffect } from 'react';
import Header from '../Header/Header';
import GroceriesContent from '../GroceriesContent/GroceriesContent';

function GroceriesPage() {
	useEffect(() => {
		document.title = 'Groceries';
	}, []);

	return (
		<div>
			<Header />
			<GroceriesContent />
		</div>
	);
}

export default GroceriesPage;
