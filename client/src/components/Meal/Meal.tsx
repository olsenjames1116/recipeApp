import { useEffect, useState } from 'react';
import { IPlanner } from '../../types';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { addPlanner } from '../../redux/state/plannerSlice';
import styles from './Meal.module.scss';
import { trashIcon } from '../../assets/images';

interface MealProps {
	dayOfTheWeek: string;
}

// Represents the meal displayed in the meal planner.
function Meal({ dayOfTheWeek }: MealProps) {
	const planner = useSelector((state: IRootState) => state.planner.value);

	const [meal, setMeal] = useState({});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		// Finds the meal from state to display details to user.
		const index = planner.findIndex(
			(meal: IPlanner) => meal.day === dayOfTheWeek
		);

		setMeal({ ...planner[index] });
	}, []);

	// Deletes the specified meal from the planner.
	const deleteMeal = async (
		event: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		event.preventDefault();

		try {
			const response = await api.delete(
				`/user/planner/${(meal as IPlanner)._id}`
			);

			dispatch(addPlanner(response.data.planner));
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
				<div className={styles.container} data-testid={`meal-${dayOfTheWeek}`}>
					<img
						src={trashIcon}
						alt=""
						onClick={deleteMeal}
						className={styles.delete}
						tabIndex={0}
						data-testid={`meal-delete-${dayOfTheWeek}`}
					/>
					<a
						href={(meal as IPlanner).recipe.url}
						target="_blank"
						className={styles.link}
						data-testid={`meal-link-${dayOfTheWeek}`}
					>
						<img
							src={(meal as IPlanner).recipe.image}
							alt=""
							className={styles.image}
							data-testid={`meal-image-${dayOfTheWeek}`}
						/>
						<span data-testid={`meal-span-${dayOfTheWeek}`}>
							{(meal as IPlanner).recipe.title}
						</span>
					</a>
				</div>
			) : null}
		</>
	);
}

export default Meal;
