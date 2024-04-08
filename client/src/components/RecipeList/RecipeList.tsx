import { useEffect } from 'react';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { IRecipeWithId } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { addRecipeList } from '../../redux/state/recipeListSlice';
import RecipeListItem from '../RecipeListItem/RecipeListItem';
import styles from './RecipeList.module.scss';

// Represents the list of recipes stored by the user.
function RecipeList() {
	const recipeList = useSelector((state: IRootState) => state.recipeList.value);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		// Retrieve the stored recipes for a user.
		const getRecipeList = async () => {
			try {
				const response = await api.get('/user/recipes');

				dispatch(addRecipeList(response.data.recipes));
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

		getRecipeList();
	}, []);

	return (
		<ul
			className={`${styles.list} ${
				recipeList.length === 0 ? styles.noRecipes : styles.recipes
			}`}
		>
			{recipeList.length === 0 ? (
				<li className={styles.text}>
					You do not have saved recipes. View our{' '}
					<Link to="/" className={styles.link}>
						recipes
					</Link>{' '}
					and save one!
				</li>
			) : (
				recipeList.map((recipe: IRecipeWithId) => {
					return <RecipeListItem key={recipe._id} recipe={recipe} />;
				})
			)}
		</ul>
	);
}

export default RecipeList;
