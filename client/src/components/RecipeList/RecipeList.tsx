import { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { IRecipeWithId } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { trashIcon } from '../../assets/images';

// Represents the list of recipes stored by the user.
function RecipeList() {
	const [recipeList, setRecipeList] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		// Retrieve the stored recipes for a user.
		const getRecipeList = async () => {
			try {
				const response = await api.get('/user/recipes');

				// Store user's recipes in state.
				setRecipeList(response.data.recipes);
			} catch (error) {
				if (error instanceof AxiosError && error.response?.status === 403) {
					/* 403 error code is sent from backend if user has not been authenticated.
	// 				Navigate user back to log in page to authenticate. */
					navigate('/log-in');
				} else {
					// A catch all for errors produced from api call.
					console.log(error);
				}
			}
		};

		getRecipeList();
	}, []);

	// Delete stored recipe from db.
	const deleteRecipe = async (id: string) => {
		try {
			await api.delete(`/user/recipe/${id}`);

			navigate(0);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ul>
			{recipeList.length === 0 ? (
				<li>
					You do not have saved recipes. View our <Link to="/">recipes</Link>{' '}
					and save one!
				</li>
			) : (
				recipeList.map((recipe: IRecipeWithId, index) => {
					return (
						<li key={index}>
							<a href={recipe.url} target="_blank">
								<img src={recipe.image} />
								<span>{recipe.title}</span>
							</a>
							<img src={trashIcon} onClick={() => deleteRecipe(recipe._id)} />
						</li>
					);
				})
			)}
		</ul>
	);
}

export default RecipeList;
