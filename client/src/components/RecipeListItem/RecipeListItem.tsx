import { IRecipeWithId } from '../../types';
import { trashIcon } from '../../assets/images';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { addRecipeList } from '../../redux/state/recipeListSlice';
import api from '../../axiosConfig';
import styles from './RecipeListItem.module.scss';

interface RecipeListItemProps {
	recipe: IRecipeWithId;
	index: number;
}

// Represents a single recipe on the list of recipes stored by user on the recipe page.
function RecipeListItem({ recipe, index }: RecipeListItemProps) {
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
		<li
			key={recipe._id}
			className={styles.listItem}
			data-testid={`recipe-list-item-${index}`}
		>
			<img
				src={trashIcon}
				alt="Delete recipe"
				onClick={() => deleteRecipe(recipe._id)}
				className={styles.delete}
				tabIndex={0}
				data-testid="recipe-list-item-delete"
			/>
			<a
				href={recipe.url}
				target="_blank"
				className={styles.link}
				data-testid={`recipe-list-item-link-${index}`}
			>
				<img
					src={recipe.image}
					className={styles.image}
					alt="Recipe information page"
					data-testid={`recipe-list-item-image-${index}`}
				/>
				<span
					className={styles.span}
					data-testid={`recipe-list-item-title-${index}`}
				>
					{recipe.title}
				</span>
			</a>
		</li>
	);
}

export default RecipeListItem;
