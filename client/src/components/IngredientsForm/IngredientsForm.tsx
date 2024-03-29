import { useEffect, useRef, useState } from 'react';
import api from '../../axiosConfig';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IIngredientWithId } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { addAllIngredients } from '../../redux/state/allIngredientsSlice';

// Represents the form for users to add and remove ingredients.
function IngredientsForm() {
	const [userIngredients, setUserIngredients] = useState(['']);

	const allIngredients = useSelector(
		(state: IRootState) => state.allIngredients.value
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

		setUserIngredients(userIngredients);
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

		getIngredients();
	}, []);

	// Reached after the cancel button is pressed. Cancels changes to the form.
	const cancelChanges = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (saveButtonRef.current) saveButtonRef.current.disabled = true;

		console.log('cancel');
	};

	const storeCheckedIngredients = async (checkedIngredients: string[]) => {
		try {
			await api.post('/user/store-ingredients', {
				ingredients: checkedIngredients,
			});
		} catch (error) {
			console.log(error);
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

		// Creates an array of value strings from checked boxes.
		const checkedElementsArray = formArray
			?.filter((child) => {
				if (child instanceof HTMLInputElement && child.checked === true) {
					return child.value;
				}
			})
			.map((element) => element.id);

		console.log(checkedElementsArray);

		checkedElementsArray && storeCheckedIngredients(checkedElementsArray);

		if (saveButtonRef.current) saveButtonRef.current.disabled = true;
	};

	// Enables the save button to be pressed after a change has been made to the form.
	const enableSave = () => {
		if (saveButtonRef.current) saveButtonRef.current.disabled = false;
	};

	return (
		<form ref={formRef} onSubmit={saveIngredients}>
			<ul>
				{allIngredients.map((ingredient: IIngredientWithId) => {
					const checked = userIngredients.includes(ingredient._id)
						? true
						: false;

					return (
						<li key={ingredient._id}>
							<input
								type="checkbox"
								id={ingredient._id}
								value={ingredient.name}
								onChange={enableSave}
								defaultChecked={checked}
							/>
							<label htmlFor={ingredient._id}>{ingredient.name}</label>
						</li>
					);
				})}
			</ul>
			<button onClick={cancelChanges}>Cancel</button>
			<button ref={saveButtonRef} disabled>
				Save
			</button>
		</form>
	);
}

export default IngredientsForm;
