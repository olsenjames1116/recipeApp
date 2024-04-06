import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { addRecipesQuery } from '../../redux/state/recipesQuerySlice';
import { addRecipeSearchResults } from '../../redux/state/recipeSearchResultsSlice';
import styles from './MealPlannerForm.module.scss';

// Represents the form to search stored recipes to add to planner.
function MealPlannerForm() {
	const recipeList = useSelector((state: IRootState) => state.recipeList.value);

	const dispatch = useDispatch();

	// Search recipes stored by user for recipe using query.
	const searchRecipes = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;

		dispatch(addRecipesQuery(query));

		const recipeSearchResults = recipeList.filter((recipe) =>
			recipe.title?.toLowerCase().includes(query.toLowerCase())
		);

		dispatch(addRecipeSearchResults(recipeSearchResults));
	};

	return (
		<form className={styles.form}>
			<input
				type="text"
				onChange={searchRecipes}
				maxLength={50}
				className={styles.input}
			/>
		</form>
	);
}

export default MealPlannerForm;
