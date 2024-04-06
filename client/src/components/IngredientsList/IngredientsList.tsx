import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import styles from './IngredientsList.module.scss';

/* Represents the list of ingredients the user has stored to be 
displayed on the groceries page. */
function IngredientsList() {
	const userIngredients = useSelector(
		(state: IRootState) => state.userIngredients.value
	);

	return (
		<ul className={styles.list}>
			{userIngredients.length === 0 ? (
				<li className={styles.text}>
					You do not have any ingredients in your pantry. You can add some{' '}
					<Link to="/ingredients">here</Link>.
				</li>
			) : (
				userIngredients.map((ingredient) => (
					<li key={ingredient._id} className={styles.ingredient}>
						{ingredient.name}
					</li>
				))
			)}
		</ul>
	);
}

export default IngredientsList;
