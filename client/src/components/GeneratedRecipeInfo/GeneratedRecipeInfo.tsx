import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { IRecipe } from '../../types';
import styles from './GeneratedRecipeInfo.module.scss';

// Represents the info for the random recipe retrieved from Spoonacular api.
function GeneratedRecipeInfo() {
	const randomRecipe: IRecipe = useSelector(
		(state: IRootState) => state.randomRecipe.value
	);

	return (
		<a href={randomRecipe.url} target="_blank" className={styles.link}>
			<img src={randomRecipe.image} alt="" className={styles.image} />
			<span className={styles.span}>{randomRecipe.title}</span>
		</a>
	);
}

export default GeneratedRecipeInfo;
