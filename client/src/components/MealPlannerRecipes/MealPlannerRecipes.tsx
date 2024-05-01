import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import api from '../../axiosConfig';
import { addRecipeList } from '../../redux/state/recipeListSlice';
import { IRecipeWithId } from '../../types';
import MealPlannerRecipe from '../MealPlannerRecipe/MealPlannerRecipe';
import styles from './MealPlannerRecipes.module.scss';

interface MealPlannerRecipesProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the recipes stored by the user.
function MealPlannerRecipes({ setDisplayMenu }: MealPlannerRecipesProps) {
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

		// Determine if the recipe list is already stored in state.
		if (recipeList.length === 0) {
			getRecipeList();
		}
	}, []);

	return (
		<ul className={styles.list} data-testid="meal-planner-recipes">
			{recipeList.length === 0 ? (
				<li className={styles.listItem}>
					You do not have saved recipes. View our{' '}
					<Link to="/" className={styles.link}>
						recipes
					</Link>{' '}
					and save one!
				</li>
			) : (
				recipeList.map((recipe: IRecipeWithId, index) => {
					return (
						<MealPlannerRecipe
							key={recipe._id}
							recipe={recipe}
							setDisplayMenu={setDisplayMenu}
							index={index}
						/>
					);
				})
			)}
		</ul>
	);
}

export default MealPlannerRecipes;
