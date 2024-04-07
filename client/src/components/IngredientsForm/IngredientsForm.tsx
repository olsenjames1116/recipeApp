import { useEffect, useRef } from 'react';
import api from '../../axiosConfig';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IIngredientWithId } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import {
	addAllIngredients,
	removeAllIngredients,
} from '../../redux/state/allIngredientsSlice';
import {
	addUserIngredients,
	removeUserIngredients,
} from '../../redux/state/userIngredientsSlice';
import IngredientInput from '../IngredientInput/IngredientInput';
import styles from './IngredientsForm.module.scss';

// Represents the form for users to add and remove ingredients.
function IngredientsForm() {
	const allIngredients = useSelector(
		(state: IRootState) => state.allIngredients.value
	);
	const userIngredients = useSelector(
		(state: IRootState) => state.userIngredients.value
	);

	const saveButtonRef = useRef<HTMLButtonElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	/* Reached after a successful call to retrieve ingredients from the backend.
	The ingredients will be stored in state. */
	const storeIngredientsInState = (response: AxiosResponse) => {
		const { userIngredients } = response.data;
		const { allStoredIngredients } = response.data;

		dispatch(addUserIngredients(userIngredients));
		dispatch(addAllIngredients(allStoredIngredients));
	};

	useEffect(() => {
		// Retrieve all ingredients and ingredients stored by the user from the db.
		const getIngredients = async () => {
			try {
				const response = await api.get('/ingredients');

				storeIngredientsInState(response);
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

		dispatch(removeUserIngredients());
		dispatch(removeAllIngredients());
		getIngredients();
	}, []);

	/* Reached after the cancel button is pressed. Cancels changes to the form
	and navigates back to the home page. */
	const cancelChanges = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (saveButtonRef.current) saveButtonRef.current.disabled = true;

		navigate('/');
	};

	// Store ingredients that were checked on the form.
	const storeCheckedIngredients = async (checkedIngredients: string[]) => {
		try {
			const response = await api.post('/user/store-ingredients', {
				ingredients: checkedIngredients,
			});

			dispatch(addUserIngredients(response.data.ingredients));
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

	// Reached after the save button is pressed. Stores changes made in the form.
	const saveIngredients = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let formArray;

		if (formRef.current) {
			// Convert NodeList to an array.
			formArray = Array.from(formRef.current) as
				| HTMLInputElement[]
				| HTMLButtonElement[];
		}

		// Creates an array of id strings from checked boxes.
		const checkedElementsArray = formArray
			?.filter((child) => {
				if (child instanceof HTMLInputElement && child.checked === true) {
					return child.value;
				}
			})
			.map((element) => element.id);

		checkedElementsArray && storeCheckedIngredients(checkedElementsArray);

		if (saveButtonRef.current) saveButtonRef.current.disabled = true;
	};

	return (
		<form ref={formRef} onSubmit={saveIngredients} className={styles.form}>
			<ul className={styles.list}>
				{allIngredients.map((ingredient: IIngredientWithId) => {
					const checked = userIngredients.some(
						({ _id }) => _id === ingredient._id
					);

					return (
						<IngredientInput
							key={ingredient._id}
							ingredient={ingredient}
							checked={checked}
							saveButtonRef={saveButtonRef}
						/>
					);
				})}
			</ul>
			<div className={styles.buttonContainer}>
				<button
					onClick={cancelChanges}
					className={`${styles.button} ${styles.cancelButton}`}
				>
					Cancel
				</button>
				<button
					ref={saveButtonRef}
					disabled
					className={`${styles.button} ${styles.saveButton}`}
				>
					Save
				</button>
			</div>
		</form>
	);
}

export default IngredientsForm;
