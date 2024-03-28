import { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// Represents the form for users to add and remove ingredients.
function IngredientsForm() {
	const [ingredients, setIngredients] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const getIngredients = async () => {
			try {
				const response = await api.get('/ingredients');

				console.log(response);
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
	});

	return <form>IngredientsForm</form>;
}

export default IngredientsForm;
