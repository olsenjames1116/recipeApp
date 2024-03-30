import { useDispatch, useSelector } from 'react-redux';
import { closeRedIcon } from '../../assets/images';
import { IRootState } from '../../redux/store';
import axios, { AxiosResponse } from 'axios';
import { IRecipe } from '../../types';
import { addRandomRecipe } from '../../redux/state/randomRecipeSlice';

// Represents the icon that generates a new recipe from a currently generated recipe.
function NextRecipe() {
	const recipeType = useSelector((state: IRootState) => state.recipeType.value);

	const dispatch = useDispatch();

	// Reached from a successful call to Spoonacular api.
	const handleSuccess = (response: AxiosResponse) => {
		// Destructure response with recipe and store in state.
		const { title, image, sourceUrl } = response.data.recipes[0];

		const recipe: IRecipe = {
			title: title,
			image: image,
			url: sourceUrl,
		};

		dispatch(addRandomRecipe(recipe));
	};

	// Generate a new recipe from Spoonacular api.
	const generateRecipe = async () => {
		let spoonacularApi;

		/* Determine if the recipe should be generated completely randomly 
		or using the ingredients the user has on hand. */
		if (recipeType === 'random') {
			spoonacularApi = 'https://api.spoonacular.com/recipes/random?';
		} else {
			spoonacularApi = 'https://api.spoonacular.com/recipes/findByIngredients';
		}

		try {
			const response = await axios.get(
				`${spoonacularApi}apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
			);

			// Anything below here is reached after a successful call to the Spoonacular api.
			handleSuccess(response);
		} catch (error) {
			console.log(error);
		}
	};

	return <img src={closeRedIcon} alt="" onClick={generateRecipe} />;
}

export default NextRecipe;
