import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import MealPlannerRecipe from '../MealPlannerRecipe/MealPlannerRecipe';

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
						<MealPlannerRecipe
							key={recipe._id}
							recipe={recipe}
							setDisplayMenu={setDisplayMenu}
						/>
					);
				})
			)}
		</ul>
	);
}

export default MealPlannerSearchResults;
