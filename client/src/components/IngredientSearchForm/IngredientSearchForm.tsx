import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { addUserIngredients } from '../../redux/state/userIngredientsSlice';
import { addAllIngredients } from '../../redux/state/allIngredientsSlice';
import { IIngredientWithId } from '../../types';

function IngredientSearchForm() {
	const allIngredients = useSelector(
		(state: IRootState) => state.allIngredients.value
	);
	const userIngredients = useSelector(
		(state: IRootState) => state.userIngredients.value
	);

	const submitButtonRef = useRef<HTMLButtonElement>(null);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const storeIngredientsInState = (response: AxiosResponse) => {
		const { userIngredients } = response.data;
		const { allStoredIngredients } = response.data;

		dispatch(addUserIngredients(userIngredients));
		dispatch(addAllIngredients(allStoredIngredients));
	};

	useEffect(() => {
		const getIngredients = async () => {
			try {
				const response = await api.get('/ingredients');

				storeIngredientsInState(response);
			} catch (error) {
				if (error instanceof AxiosError && error.response?.status === 403) {
					/* 403 error code is sent from backend if user has not been authenticated.
					Navigate user back to log in page to authenticate. */
					navigate('/log-in');
				}
			}
		};

		if (allIngredients.length === 0) {
			getIngredients();
		}
	}, []);

	const enableSubmit = () => {
		if (submitButtonRef.current) submitButtonRef.current.disabled = false;
	};

	return (
		<form>
			<ul>
				{allIngredients.map((ingredient: IIngredientWithId) => {
					const userHasIngredient = userIngredients.includes(ingredient._id)
						? true
						: false;

					return (
						<li key={ingredient._id}>
							<input
								type="checkbox"
								id={ingredient._id}
								value={ingredient.name}
								onChange={enableSubmit}
							/>
							<label
								htmlFor={ingredient._id}
								style={
									userHasIngredient ? { color: 'green' } : { color: 'black' }
								}
							>
								{ingredient.name}
							</label>
						</li>
					);
				})}
			</ul>
			<button disabled>Submit</button>
		</form>
	);
}

export default IngredientSearchForm;
