import LogOut from '../LogOut/LogOut';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<ul>
				<li>
					<Link to="/">Logo</Link>
				</li>
				<li>
					<Link to="/recipes">Saved Recipes</Link>
				</li>
				<li>
					<Link to="/ingredients">Pantry</Link>
				</li>
				<LogOut />
			</ul>
		</header>
	);
}

export default Header;
