import { useEffect } from 'react';
import Header from '../Header/Header';
import IngredientsContent from '../IngredientsContent/IngredientsContent';

// Represents the page where users can view their saved ingredients.
function IngredientsPage() {
	useEffect(() => {
		document.title = 'Pantry';
	}, []);

	return (
		<div>
			<Header />
			<IngredientsContent />
		</div>
	);
}

export default IngredientsPage;
