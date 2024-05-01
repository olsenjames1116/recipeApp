import { IRecipeWithId } from '../../types';
import AddMealToPlannerButton from '../AddMealToPlannerButton/AddMealToPlannerButton';
import styles from './MealPlannerRecipe.module.scss';

interface MealPlannerRecipeProps {
	recipe: IRecipeWithId;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
	index: number;
}

// Represents a single recipe stored by the user on the meal planner page.
function MealPlannerRecipe({
	recipe,
	setDisplayMenu,
	index,
}: MealPlannerRecipeProps) {
	return (
		<li
			key={recipe._id}
			id={recipe._id}
			className={styles.listItem}
			data-testid={`meal-planner-recipe-${index}`}
		>
			<span className={styles.span} data-testid="meal-planner-recipe-span-0">
				{recipe.title}
			</span>
			<AddMealToPlannerButton setDisplayMenu={setDisplayMenu} />
		</li>
	);
}

export default MealPlannerRecipe;
