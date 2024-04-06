import IngredientsForm from '../IngredientsForm/IngredientsForm';
import styles from './IngredientsContent.module.scss';

// Represents the content in on the ingredients page.
function IngredientsContent() {
	return (
		<main className={styles.main}>
			<IngredientsForm />
		</main>
	);
}

export default IngredientsContent;
