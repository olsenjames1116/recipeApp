import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';

// Represents the form to search stored recipes to add to planner.
function MealPlannerForm() {
	const recipeList = useSelector((state: IRootState) => state.recipeList.value);

	// Search recipes stored by user for recipe using query.
	const searchRecipes = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;

		const recipeSearchResults = recipeList.filter((recipe) =>
			recipe.title?.toLowerCase().includes(query.toLowerCase())
		);

		console.log(recipeSearchResults);
	};

	return (
		<form>
			<input type="text" onChange={searchRecipes} />
		</form>
	);
}

export default MealPlannerForm;
