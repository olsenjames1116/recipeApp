import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { IRecipeWithId } from '../../types';
import { AxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../axiosConfig';
import { addRecipeList } from '../../redux/state/recipeListSlice';

// Represents the sidebar to display a user's recipe.
function RecipesSidebar() {
	const recipeList = useSelector((state: IRootState) => state.recipeList.value);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		// Retrieve the stored recipes for a user.
		const getRecipeList = async () => {
			try {
				const response = await api.get('/user/recipes');

				//Store user's recipes in state.
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

		if (recipeList.length === 0) {
			getRecipeList();
		}
	}, []);

	return (
		<ul>
			{recipeList.length === 0 ? (
				<li>
					You do not have saved recipes. View our <Link to="/">recipes</Link>{' '}
					and save one!
				</li>
			) : (
				recipeList.map((recipe: IRecipeWithId) => {
					return (
						<li key={recipe._id}>
							<a href={recipe.url} target="_blank">
								<img src={recipe.image} />
								<span>{recipe.title}</span>
							</a>
						</li>
					);
				})
			)}
		</ul>
	);
}

export default RecipesSidebar;