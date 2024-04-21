import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { addUserIngredients } from '../../redux/state/userIngredientsSlice';
import { addAllIngredients } from '../../redux/state/allIngredientsSlice';
import { IIngredientWithId, IRecipe } from '../../types';
import InputMessages from '../InputMessages/InputMessages';
import axios from 'axios';
import { addRecipeType } from '../../redux/state/recipeTypeSlice';
import { addRandomRecipe } from '../../redux/state/randomRecipeSlice';
import { addSearchIngredients } from '../../redux/state/searchIngredientsSlice';
import IngredientSearchInput from '../IngredientSearchInput/IngredientSearchInput';
import styles from './IngredientSearchForm.module.scss';

interface IngredientSearchFormProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the form to search for recipes with ingredients.
function IngredientSearchForm({ setDisplayMenu }: IngredientSearchFormProps) {
	const allIngredients = useSelector(
		(state: IRootState) => state.allIngredients.value
	);
	const userIngredients = useSelector(
		(state: IRootState) => state.userIngredients.value
	);
	// const searchIngredients = useSelector(
	// 	(state: IRootState) => state.searchIngredients.value
	// );

	const [inputMessages, setInputMessages] = useState<string[]>([]);
	const [error, setError] = useState(false);

	const submitButtonRef = useRef<HTMLButtonElement>(null);
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
				}
			}
		};

		// Check if ingredients are already in state.
		if (allIngredients.length === 0) {
			getIngredients();
		}
	}, []);

	// Reached from a successful call to the Spoonacular api.
	const handleSuccess = (recipeInformation: AxiosResponse) => {
		/* Set the recipe type to ingredients to represent a recipe generated
		from a search with the user's ingredients. */
		dispatch(addRecipeType('ingredients'));

		// Destructure response with recipe and store in state.
		const { title, image, sourceUrl, id } = recipeInformation.data;

		const recipe: IRecipe = {
			title: title,
			image: image,
			url: sourceUrl,
			id: id,
		};

		dispatch(addRandomRecipe(recipe));
	};

	// Generate a recipe using the user's ingredients from the Spoonacular api.
	const generateRecipe = async (checkedElementsString: string) => {
		try {
			// Generate the random recipe using ingredients.
			const randomRecipe = await axios.get(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
					import.meta.env.VITE_SPOONACULAR_API_KEY
				}&includeIngredients=${checkedElementsString}&sort=random&number=1`
			);

			const { id } = randomRecipe.data.results[0];

			// Get the random recipe's information.
			const recipeInformation = await axios.get(
				`https://api.spoonacular.com/recipes/${id}/information?apiKey=${
					import.meta.env.VITE_SPOONACULAR_API_KEY
				}`
			);

			handleSuccess(recipeInformation);
		} catch (error) {
			console.log(error);
		}
	};

	/* Reached after the submit button is pressed. Will search the Spoonacular 
	api for a random recipe with the user's ingredients. */
	const findCheckedElements = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		setInputMessages([]);

		let formArray;

		if (formRef.current) {
			// Convert NodeList to an array.
			formArray = Array.from(formRef.current) as
				| HTMLInputElement[]
				| HTMLButtonElement[];
		}

		// Creates an array of value string from checked boxes.
		const checkedElementsArray = formArray
			?.filter((child) => {
				if (child instanceof HTMLInputElement && child.checked === true) {
					return child.value;
				}
			})
			.map((element) => element.value);

		// Check to see if array is empty.
		if (checkedElementsArray?.length === 0) {
			// If array is empty, display an error message and disable search.
			if (submitButtonRef.current) submitButtonRef.current.disabled = true;

			setError(true);

			setInputMessages(['Select ingredients to search for recipes.']);
		} else {
			setDisplayMenu(false);

			const checkedElementsString = checkedElementsArray?.join(',+');

			dispatch(addSearchIngredients(checkedElementsString));

			generateRecipe(checkedElementsString!);
		}
	};

	return (
		<form ref={formRef} onSubmit={findCheckedElements} className={styles.form}>
			<ul className={styles.list} data-cy="ingredient-search-list">
				{allIngredients.map((ingredient: IIngredientWithId) => {
					const userHasIngredient = userIngredients.some(
						(userIngredient) => userIngredient._id === ingredient._id
					);

					return (
						<IngredientSearchInput
							key={ingredient._id}
							ingredient={ingredient}
							userHasIngredient={userHasIngredient}
							submitButtonRef={submitButtonRef}
						/>
					);
				})}
			</ul>
			<button
				ref={submitButtonRef}
				disabled
				className={styles.button}
				data-cy="submit-ingredient-search-form-button"
			>
				Submit
			</button>
			<InputMessages messages={inputMessages} error={error} />
		</form>
	);
}

export default IngredientSearchForm;
