import axios from 'axios';

function RandomRecipe() {
	const handleClick = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		console.log(import.meta.env.VITE_SPOONACULAR_API_KEY);

		try {
			const response = await axios.get(
				`https://api.spoonacular.com/recipes/random?apiKey=${
					import.meta.env.VITE_SPOONACULAR_API_KEY
				}`
			);

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return <button onClick={handleClick}>Surprise Me</button>;
}

export default RandomRecipe;
