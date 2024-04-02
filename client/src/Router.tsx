import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LogInPage from './components/LogInPage/LogInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import IngredientsPage from './components/IngredientsPage/IngredientsPage';
import RecipesPage from './components/RecipesPage/RecipesPage';
import MealPlannerPage from './components/MealPlannerPage/MealPlannerPage';
import GroceriesPage from './components/GroceriesPage/GroceriesPage';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/log-in" element={<LogInPage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/ingredients" element={<IngredientsPage />} />
			<Route path="/recipes" element={<RecipesPage />} />
			<Route path="/meal-planner" element={<MealPlannerPage />} />
			<Route path="/groceries" element={<GroceriesPage />} />
		</Routes>
	);
}

export default Router;
