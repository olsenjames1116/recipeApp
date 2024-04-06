import { useEffect } from 'react';
import { AxiosError } from 'axios';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { addUserIngredients } from '../../redux/state/userIngredientsSlice';
import IngredientsList from '../IngredientsList/IngredientsList';
import styles from './IngredientsOnHand.module.scss';

/* Represents the container for ingredients the user has stored 
to be displayed on the groceries page. */
function IngredientsOnHand() {
	const userIngredients = useSelector(
		(state: IRootState) => state.userIngredients.value
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		// Retrieve the user's stored ingredients from the db.
		const getUserIngredients = async () => {
			try {
				const response = await api.get('/user/saved-ingredients');

				dispatch(addUserIngredients(response.data.ingredients));
			} catch (error) {
				if (error instanceof AxiosError && error.response?.status === 403) {
					/* 403 error code is sent from backend if user has not been authenticated.
					Navigate user back to log in page to authenticate. */
					navigate('/log-in');
				} else {
					console.log(error);
				}
			}
		};

		/* If the user's ingredients are already stored in state, do not make
        a call to the backend. */
		if (userIngredients.length === 0) {
			getUserIngredients();
		}
	}, []);

	return (
		<div className={styles.container}>
			<span>Here is what you have:</span>
			<IngredientsList />
		</div>
	);
}

export default IngredientsOnHand;
