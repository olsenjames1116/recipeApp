import { useEffect, useState } from 'react';
import axios from 'axios';

// Represents the component that displays a food joke to the user.
function FoodJoke() {
	const [foodJoke, setFoodJoke] = useState('');

	useEffect(() => {
		// Get a random food joke from the Spoonacular api.
		const getFoodJoke = async () => {
			try {
				const response = await axios.get(
					`https://api.spoonacular.com/food/trivia/random?apiKey=${
						import.meta.env.VITE_SPOONACULAR_API_KEY
					}`
				);

				setFoodJoke(response.data.text);
			} catch (error) {
				// A catch all for errors from calling the Spoonacular api.
				console.log(error);
			}
		};

		getFoodJoke();
	}, []);

	return <blockquote>{foodJoke}</blockquote>;
}

export default FoodJoke;
