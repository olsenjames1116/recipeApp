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

// Represents the header at the top of the page.
function Header() {
	return (
		<header>
			<nav className={styles.nav}>
				<NavItem to="/" src={homeIcon} alt="Home page" title="Home" />
				<NavItem
					to="/recipes"
					src={recipeIcon}
					alt="Recipes page"
					title="Recipes"
				/>
				<NavItem
					to="/ingredients"
					src={pantryIcon}
					alt="Pantry page"
					title="Pantry"
				/>
				<NavItem
					to="/meal-planner"
					src={plannerIcon}
					alt="Meal planner page"
					title="Meal Planner"
				/>
				<NavItem
					to="/groceries"
					src={groceriesIcon}
					alt="Groceries page"
					title="Groceries"
				/>
				<LogOut />
			</nav>
		</header>
	);
}

export default Header;
