import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { addRandomRecipe } from '../../redux/state/randomRecipeSlice';
import { IRecipe } from '../../types';
import { addRecipeType } from '../../redux/state/recipeTypeSlice';

// Represents the element that generates a random recipe.
function RandomRecipe() {
	const dispatch = useDispatch();

	// Reached from a successful call to Spoonacular api.
	const handleSuccess = (response: AxiosResponse) => {
		// Set the recipe type to random to represent a completely random generated recipe.
		dispatch(addRecipeType('random'));

		// Destructure response with recipe and store in state.
		const { title, image, sourceUrl, id } = response.data.recipes[0];

		const recipe: IRecipe = {
			title: title,
			image: image,
			url: sourceUrl,
			id: id,
		};

		dispatch(addRandomRecipe(recipe));
	};

	// Generate a random recipe from the Spoonacular api.
	const generateRecipe = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		try {
			const response = await axios.get(
				`https://api.spoonacular.com/recipes/random?apiKey=${
					import.meta.env.VITE_SPOONACULAR_API_KEY
				}`
			);

			handleSuccess(response);
		} catch (error) {
			console.log(error);
		}
	};

	return <button onClick={generateRecipe}>Surprise Me</button>;
}

export default RandomRecipe;
