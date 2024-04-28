import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { addPlanner } from '../../redux/state/plannerSlice';
import styles from './AddMealToPlannerButton.module.scss';

interface AddMealToPlannerProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

/* Represents the add button next to a search result in the meal
planner menu. */
function AddMealToPlannerButton({ setDisplayMenu }: AddMealToPlannerProps) {
	const selectedDay = useSelector(
		(state: IRootState) => state.selectedDay.value
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Adds the selected meal to the planner on that day and stores in db.
	const addMealToPlanner = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		const { id } = (event.target as HTMLButtonElement).parentElement!;

		try {
			const response = await api.post(
				`/user/store-in-planner/${selectedDay}/${id}`
			);

			setDisplayMenu(false);

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
		<button
			onClick={addMealToPlanner}
			className={styles.button}
			data-testid="add-meal-to-planner-button"
		>
			+Add
		</button>
	);
}

export default AddMealToPlannerButton;
