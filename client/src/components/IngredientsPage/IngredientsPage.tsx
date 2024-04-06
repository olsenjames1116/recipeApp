import { useEffect } from 'react';
import Header from '../Header/Header';
import IngredientsContent from '../IngredientsContent/IngredientsContent';
import styles from './IngredientsPage.module.scss';

// Represents the page where users can view their saved ingredients.
function IngredientsPage() {
	useEffect(() => {
		document.title = 'Pantry';
	}, []);

	return (
		<div className={styles.page}>
			<Header location="ingredients" />
			<IngredientsContent />
		</div>
	);
}

export default IngredientsPage;
