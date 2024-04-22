import { Link } from 'react-router-dom';
import DemoAccountLogIn from '../DemoAccountLogIn/DemoAccountLogIn';
import styles from './LogInOptions.module.scss';

// Represents the alternatives to logging in on the log in page.
function LogInOptions() {
	return (
		<ul className={styles.list}>
			<li className={styles.listItem} data-testid="log-in-options">
				Don't have an account?{' '}
				<Link to="/sign-up" className={styles.link}>
					Create One
				</Link>
			</li>
			<li className={styles.listItem}>or</li>
			<DemoAccountLogIn />
		</ul>
	);
}

export default LogInOptions;
