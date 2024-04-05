// import FoodJoke from '../FoodJoke/FoodJoke';
import RandomRecipe from '../RandomRecipe/RandomRecipe';
// import FoodFact from '../FoodFact/FoodFact';
// import { useEffect, useState } from 'react';
import RandomRecipeWithIngredients from '../RandomRecipeWithIngredients/RandomRecipeWithIngredients';
import styles from './GenerateRecipes.module.scss';

interface GenerateRecipesProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the recipe generator for the Spoonacular api.
function GenerateRecipes({ setDisplayMenu }: GenerateRecipesProps) {
	// const [randomChoice, setRandomChoice] = useState(0);

	// useEffect(() => {
	// 	// Generate a random number to display either a joke or a fact.
	// 	setRandomChoice(Math.round(Math.random()));
	// }, []);

	return (
		<div className={styles.container}>
			{/* {randomChoice > 0.5 ? <FoodJoke /> : <FoodFact />} */}
			<blockquote className={styles.blockquote}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget
				magna fermentum iaculis eu non diam phasellus. Eu volutpat odio
				facilisis mauris. Iaculis nunc sed augue lacus. Id semper risus in
				hendrerit. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus.
				Urna condimentum mattis pellentesque id. Vitae aliquet nec ullamcorper
				sit amet. Nulla pellentesque dignissim enim sit amet venenatis.
				Elementum nibh tellus molestie nunc non blandit. Sollicitudin ac orci
				phasellus egestas tellus. Lectus quam id leo in vitae. Ipsum suspendisse
				ultrices gravida dictum fusce ut placerat orci. Nisi porta lorem mollis
				aliquam. A lacus vestibulum sed arcu non odio euismod. Nulla pharetra
				diam sit amet nisl suscipit adipiscing bibendum est. Est sit amet
				facilisis magna etiam tempor orci eu.
			</blockquote>
			{/* <blockquote className={styles.blockquote}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
			</blockquote> */}
			Select an option below to generate recipes <RandomRecipe /> or{' '}
			<RandomRecipeWithIngredients setDisplayMenu={setDisplayMenu} />
		</div>
	);
}

export default GenerateRecipes;
