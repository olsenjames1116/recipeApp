import LogOut from '../LogOut/LogOut';
import { Link } from 'react-router-dom';

// Represents the header at the top of the page.
function Header() {
	return (
		<header>
			<nav>
				<Link to="/">Logo</Link>
				<Link to="/recipes">Saved Recipes</Link>
				<Link to="/ingredients">Pantry</Link>
				<Link to="/meal-planner">Meal Planner</Link>
				<Link to="/groceries">Groceries</Link>
				<LogOut />
			</nav>
		</header>
	);
}

export default Header;
