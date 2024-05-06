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
		<ul className={styles.list} data-testid="ingredients-list">
			{userIngredients.length === 0 ? (
				<li className={styles.text} data-testid="no-user-ingredients">
					You do not have any ingredients in your pantry. You can add some{' '}
					<Link to="/ingredients" className={styles.link}>
						here
					</Link>
					.
				</li>
			) : (
				userIngredients.map((ingredient, index) => (
					<li
						key={ingredient._id}
						className={styles.ingredient}
						data-testid={`user-ingredient-${index}`}
					>
						{ingredient.name}
					</li>
				))
			)}
		</ul>
	);
}

export default IngredientsList;
