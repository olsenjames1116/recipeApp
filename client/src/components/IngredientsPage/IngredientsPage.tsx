import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import IngredientsContent from '../IngredientsContent/IngredientsContent';
import { useEffect } from 'react';

function IngredientsPage() {
	const navigate = useNavigate();

	useEffect(() => {
		const authenticateUser = async () => {
			try {
			} catch (error) {
				console.log(error);
			}
		};
	});

	return (
		<div>
			<Header />
			<IngredientsContent />
		</div>
	);
}

export default IngredientsPage;
