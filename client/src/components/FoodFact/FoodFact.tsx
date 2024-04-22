import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './FoodFact.module.scss';

// Represents the component that displays a food fact to the user.
function FoodFact() {
	const [foodFact, setFoodFact] = useState('');

	useEffect(() => {
		// Get a random food fact from the Spoonacular api.
		const getFoodFact = async () => {
			try {
				const response = await axios.get(
					`https://api.spoonacular.com/food/trivia/random?apiKey=${
						import.meta.env.VITE_SPOONACULAR_API_KEY
					}`
				);

				setFoodFact(response.data.text);
			} catch (error) {
				// A catch all for errors from calling the Spoonacular api.
				console.log(error);
			}
		};

		getFoodFact();
	}, []);

	return (
		<blockquote className={styles.blockquote} data-testid="food-fact">
			{foodFact}
		</blockquote>
	);
}

export default FoodFact;
