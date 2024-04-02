import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import AddMealToPlannerButton from '../AddMealToPlannerButton/AddMealToPlannerButton';

interface MealPlannerSearchResultsProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the meal search results from the meal planner menu.
function MealPlannerSearchResults({
	setDisplayMenu,
}: MealPlannerSearchResultsProps) {
	const recipeSearchResults = useSelector(
		(state: IRootState) => state.recipeSearchResults.value
	);
	const recipesQuery = useSelector(
		(state: IRootState) => state.recipesQuery.value
	);

	return (
		<ul>
			{recipeSearchResults.length === 0 ? (
				<li>No results for "{recipesQuery}"</li>
			) : (
				recipeSearchResults.map((recipe) => {
					return (
						<li key={recipe._id} id={recipe._id}>
							<span>{recipe.title}</span>
							<AddMealToPlannerButton setDisplayMenu={setDisplayMenu} />
						</li>
					);
				})
			)}
		</ul>
	);
}

export default MealPlannerSearchResults;
