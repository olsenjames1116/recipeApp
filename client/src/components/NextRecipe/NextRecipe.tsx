import { useDispatch, useSelector } from 'react-redux';
import { closeRedIcon } from '../../assets/images';
import { IRootState } from '../../redux/store';
import axios from 'axios';
import { IRecipe } from '../../types';
import { addRandomRecipe } from '../../redux/state/randomRecipeSlice';

interface IRecipeData {
	title: string;
	image: string;
	sourceUrl: string;
}

// Represents the icon that generates a new recipe from a currently generated recipe.
function NextRecipe() {
	const recipeType = useSelector((state: IRootState) => state.recipeType.value);
	const searchIngredients = useSelector(
		(state: IRootState) => state.searchIngredients.value
	);

	const dispatch = useDispatch();

	// Reached from a successful call to Spoonacular api.
	const handleSuccess = (recipeData: IRecipeData) => {
		// Destructure response with recipe and store in state.
		const { title, image, sourceUrl } = recipeData;

		const recipe: IRecipe = {
			title: title,
			image: image,
			url: sourceUrl,
		};

		dispatch(addRandomRecipe(recipe));
	};

	// Generate a completely random recipe.
	const generateRandomRecipe = async () => {
		try {
			const response = await axios.get(
				`https://api.spoonacular.com/recipes/random?apiKey=${
					import.meta.env.VITE_SPOONACULAR_API_KEY
				}`
			);

			handleSuccess(response.data.recipes[0]);
		} catch (error) {
			console.log(error);
		}
	};

	// Generate a recipe using the user's ingredients.
	const generateRandomRecipeWithIngredients = async () => {
		try {
			// Generate the random recipe using ingredients.
			const randomRecipe = await axios.get(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
					import.meta.env.VITE_SPOONACULAR_API_KEY
				}&includeIngredients=${searchIngredients}&sort=random&number=1`
			);

			const { id } = randomRecipe.data.results[0];

			// Get the random recipe's information.
			const recipeInformation = await axios.get(
				`https://api.spoonacular.com/recipes/${id}/information?apiKey=${
					import.meta.env.VITE_SPOONACULAR_API_KEY
				}`
			);

			handleSuccess(recipeInformation.data);
		} catch (error) {
			console.log(error);
		}
	};

	// Generate a new recipe from Spoonacular api.
	const generateRecipe = async () => {
		/* Determine if the recipe should be generated completely randomly 
		or using the ingredients the user has on hand. */
		if (recipeType === 'random') {
			generateRandomRecipe();
		} else {
			generateRandomRecipeWithIngredients();
		}
	};

	return <img src={closeRedIcon} alt="Next recipe" onClick={generateRecipe} />;
}

export default NextRecipe;
