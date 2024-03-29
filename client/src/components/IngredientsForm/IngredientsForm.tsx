import { useEffect, useRef, useState } from 'react';
import api from '../../axiosConfig';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IIngredientWithId } from '../../types';

// Represents the form for users to add and remove ingredients.
function IngredientsForm() {
	const [allIngredients, setAllIngredients] = useState([]);

	const saveButtonRef = useRef<HTMLButtonElement>(null);

	const navigate = useNavigate();

	/* Reached after a successful call to retrieve ingredients from the backend.
	 The ingredients will be stored in state. */
	const storeIngredientsInState = (response: AxiosResponse) => {
		const { allStoredIngredients } = response.data;

		setAllIngredients(allStoredIngredients);
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

	// Reached after the save button is pressed. Stores changes made in the form.
	const saveIngredients = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('save');
	};

	// Enables the save button to be pressed after a change has been made to the form.
	const enableSave = () => {
		if (saveButtonRef.current) saveButtonRef.current.disabled = false;
	};

	return (
		<form onSubmit={saveIngredients}>
			{allIngredients.map((ingredient: IIngredientWithId) => {
				return (
					<div>
						<input
							type="checkbox"
							id={ingredient._id}
							value={ingredient.name}
							onChange={enableSave}
						/>
						<label htmlFor={ingredient._id}>{ingredient.name}</label>
					</div>
				);
			})}
			<button onClick={cancelChanges}>Cancel</button>
			<button ref={saveButtonRef} disabled>
				Save
			</button>
		</form>
	);
}

export default IngredientsForm;
