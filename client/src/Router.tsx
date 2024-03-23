import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LogInPage from './components/LogInPage/LogInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import EditProfilePage from './components/EditProfilePage/EditProfilePage';
import IngredientsPage from './components/IngredientsPage/IngredientsPage';
import RecipesPage from './components/RecipesPage/RecipesPage';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/log-in" element={<LogInPage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/edit-profile" element={<EditProfilePage />} />
			<Route path="/ingredients" element={<IngredientsPage />} />
			<Route path="/recipes" element={<RecipesPage />} />
		</Routes>
	);
}

export default Router;
