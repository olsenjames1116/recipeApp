import { IRecipeWithId } from '../../types';
import AddMealToPlannerButton from '../AddMealToPlannerButton/AddMealToPlannerButton';
import styles from './MealPlannerRecipe.module.scss';

interface MealPlannerRecipeProps {
	recipe: IRecipeWithId;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents a single recipe stored by the user on the meal planner page.
function MealPlannerRecipe({ recipe, setDisplayMenu }: MealPlannerRecipeProps) {
	return (
		<li key={recipe._id} id={recipe._id} className={styles.listItem}>
			<span>{recipe.title}</span>
			<AddMealToPlannerButton setDisplayMenu={setDisplayMenu} />
		</li>
	);
}

export default MealPlannerRecipe;
