import { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import { IRecipe } from '../../types';
import { Link } from 'react-router-dom';

// Represents the list of recipes stored by the user.
function RecipeList() {
	const [recipeList, setRecipeList] = useState([]);

	useEffect(() => {
		// Retrieve the stored recipes for a user.
		const getRecipeList = async () => {
			try {
				const response = await api.get('/user/recipes');

				// Store user's recipes in state.
				setRecipeList(response.data.recipes);
			} catch (error) {
				// A catch all for errors produced from api call.
				console.log(error);
			}
		};

		getRecipeList();
	}, []);

	return (
		<ul>
			{recipeList.length === 0 ? (
				<li>
					You do not have any saved recipes. View our{' '}
					<Link to="/">recipes</Link> and save one!
				</li>
			) : (
				recipeList.map((recipe: IRecipe, index) => {
					return (
						<li key={index}>
							<a href={recipe.url} target="_blank">
								<img src={recipe.image} />
								<span>{recipe.title}</span>
							</a>
						</li>
					);
				})
			)}
		</ul>
	);
}

export default RecipeList;
