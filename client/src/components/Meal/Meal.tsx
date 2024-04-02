import { useEffect, useState } from 'react';
import { IPlanner } from '../../types';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

interface MealProps {
	dayOfTheWeek: string;
	planner: IPlanner[];
	setPlanner: React.Dispatch<React.SetStateAction<IPlanner[]>>;
}

// Represents the meal displayed in the meal planner.
function Meal({ dayOfTheWeek, planner, setPlanner }: MealProps) {
	const [meal, setMeal] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		const index = planner.findIndex(
			(meal: IPlanner) => meal.day === dayOfTheWeek
		);

		setMeal({ ...planner[index] });
	}, []);

	const deleteMeal = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		try {
			const response = await api.delete(
				`/user/planner/${(meal as IPlanner)._id}`
			);

			setPlanner([...response.data.planner]);
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 403) {
				/* 403 error code is sent from backend if user has not been authenticated. 
					Navigate user back to log in page to authenticate. */
				navigate('/log-in');
			} else {
				// A catch all for errors produced from api call.
				console.log(error);
			}
		}
	};

	return (
		<>
			{Object.keys(meal).length !== 0 ? (
				<div>
					<a href={(meal as IPlanner).recipe.url} target="_blank">
						<img src={(meal as IPlanner).recipe.image} />
						<span>{(meal as IPlanner).recipe.title}</span>
					</a>
					<button onClick={deleteMeal}>Delete</button>
				</div>
			) : null}
		</>
	);
}

export default Meal;
