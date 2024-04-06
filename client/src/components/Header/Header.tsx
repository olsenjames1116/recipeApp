import LogOut from '../LogOut/LogOut';
import styles from './Header.module.scss';
import NavItem from '../NavItem/NavItem';
import {
	homeIcon,
	recipeIcon,
	pantryIcon,
	plannerIcon,
	groceriesIcon,
} from '../../assets/images';

interface HeaderProps {
	location: string;
}

// Represents the header at the top of the page.
function Header({ location }: HeaderProps) {
	return (
		<header>
			<nav className={styles.nav}>
				<NavItem
					to="/"
					src={homeIcon}
					alt="Home page"
					title="Home"
					className={location === 'home' ? styles.active : ''}
				/>
				<NavItem
					to="/recipes"
					src={recipeIcon}
					alt="Recipes page"
					title="Recipes"
					className={location === 'recipes' ? styles.active : ''}
				/>
				<NavItem
					to="/ingredients"
					src={pantryIcon}
					alt="Pantry page"
					title="Pantry"
					className={location === 'ingredients' ? styles.active : ''}
				/>
				<NavItem
					to="/meal-planner"
					src={plannerIcon}
					alt="Meal planner page"
					title="Meal Planner"
					className={location === 'planner' ? styles.active : ''}
				/>
				<NavItem
					to="/groceries"
					src={groceriesIcon}
					alt="Groceries page"
					title="Groceries"
					className={location === 'groceries' ? styles.active : ''}
				/>
				<LogOut />
			</nav>
		</header>
	);
}

export default Header;
