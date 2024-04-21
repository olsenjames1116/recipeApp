import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { removeRecipeType } from '../../redux/state/recipeTypeSlice';
import { removeAllIngredients } from '../../redux/state/allIngredientsSlice';
import { removeUserIngredients } from '../../redux/state/userIngredientsSlice';
import { removeRecipeList } from '../../redux/state/recipeListSlice';
import { removeSelectedDay } from '../../redux/state/selectedDaySlice';
import { removePlanner } from '../../redux/state/plannerSlice';
import { removeGroceries } from '../../redux/state/groceryListSlice';
import { removeRecipesQuery } from '../../redux/state/recipesQuerySlice';
import { removeRandomRecipe } from '../../redux/state/randomRecipeSlice';
import { removeRecipeSearchResults } from '../../redux/state/recipeSearchResultsSlice';
import { removeSearchIngredients } from '../../redux/state/searchIngredientsSlice';
import styles from './LogOut.module.scss';

// Represents the log out button in the header.
function LogOut() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Clears out state stored in Redux.
	const clearRedux = () => {
		dispatch(removeRandomRecipe());
		dispatch(removeRecipeType());
		dispatch(removeAllIngredients());
		dispatch(removeUserIngredients());
		dispatch(removeSearchIngredients());
		dispatch(removeRecipeList());
		dispatch(removeSelectedDay());
		dispatch(removeRecipesQuery());
		dispatch(removeRecipeSearchResults());
		dispatch(removePlanner());
		dispatch(removeGroceries());
	};

	// Remove user's credentials from the backend.
	const logUserOut = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		try {
			await api.delete('/user/log-out');

			clearRedux();
			navigate('/log-in');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<button
			onClick={logUserOut}
			className={styles.button}
			data-cy="log-out-button"
		>
			Log Out
		</button>
	);
}

export default LogOut;
