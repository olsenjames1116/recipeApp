import { IRecipeWithId } from '../../types';
import { trashIcon } from '../../assets/images';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { addRecipeList } from '../../redux/state/recipeListSlice';
import api from '../../axiosConfig';

interface RecipeListItemProps {
	recipe: IRecipeWithId;
}

// Represents a single recipe on the list of recipes stored by user on the recipe page.
function RecipeListItem({ recipe }: RecipeListItemProps) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Delete stored recipe from db.
	const deleteRecipe = async (id: string) => {
		try {
			const response = await api.delete(`/user/recipe/${id}`);

			dispatch(addRecipeList(response.data.recipes));
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 403) {
				/* 403 error code is sent from backend if user has not been authenticated. 
					Navigate user back to log in page to authenticate. */
				navigate('/log-in');
			} else {
				// A catch all for errors produced from api call.
				console.log(error);
			}
		}
	};

	return (
		<li key={recipe._id}>
			<a href={recipe.url} target="_blank">
				<img src={recipe.image} />
				<span>{recipe.title}</span>
			</a>
			<img
				src={trashIcon}
				alt="Delete recipe"
				onClick={() => deleteRecipe(recipe._id)}
			/>
		</li>
	);
}

export default RecipeListItem;
