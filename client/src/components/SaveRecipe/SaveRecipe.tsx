import { useSelector } from 'react-redux';
import { saveIcon } from '../../assets/images';
import api from '../../axiosConfig';
import { IRootState } from '../../redux/store';
import { IRecipe } from '../../types';
import { useNavigate } from 'react-router-dom';

// Represents the icon that stores a recipe from the currently generated recipe.
function SaveRecipe() {
	const randomRecipe: IRecipe = useSelector(
		(state: IRootState) => state.randomRecipe.value
	);

	const navigate = useNavigate();

	// Store recipe in database.
	const saveRecipe = async () => {
		try {
			await api.post('/user/save-recipe', {
				title: randomRecipe.title,
				image: randomRecipe.image,
				url: randomRecipe.url,
			});

			// Navigate user to recipes page.
			navigate('/recipes');
		} catch (error) {
			// A catch all for errors produced from api call.
			console.log(error);
		}
	};

	return <img src={saveIcon} alt="" onClick={saveRecipe} />;
}

export default SaveRecipe;
