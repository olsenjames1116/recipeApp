import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { IRecipe } from '../../types';

function GeneratedRecipe() {
	const randomRecipe: IRecipe = useSelector(
		(state: IRootState) => state.randomRecipe.value
	);

	return (
		<div>
			<a href={randomRecipe.url} target="_blank">
				<img src={randomRecipe.image} />
				<span>{randomRecipe.title}</span>
			</a>
		</div>
	);
}

export default GeneratedRecipe;
