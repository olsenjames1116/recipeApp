import { useEffect, useState } from 'react';
import { IPlanner } from '../../types';

interface MealProps {
	dayOfTheWeek: string;
	planner: IPlanner[];
}

// Represents the meal displayed in the meal planner.
function Meal({ dayOfTheWeek, planner }: MealProps) {
	const [meal, setMeal] = useState({});

	useEffect(() => {
		const index = planner.findIndex(
			(meal: IPlanner) => meal.day === dayOfTheWeek
		);

		setMeal({ ...planner[index] });
	}, []);

	return (
		<div>
			{Object.keys(meal).length !== 0 ? (
				<a href={(meal as IPlanner).recipe.url} target="_blank">
					<img src={(meal as IPlanner).recipe.image} />
					<span>{(meal as IPlanner).recipe.title}</span>
				</a>
			) : null}
		</div>
	);
}

export default Meal;
