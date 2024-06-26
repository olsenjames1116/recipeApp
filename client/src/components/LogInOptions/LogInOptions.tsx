import { Link } from 'react-router-dom';
import DemoAccountLogIn from '../DemoAccountLogIn/DemoAccountLogIn';
import styles from './LogInOptions.module.scss';

// Represents the alternatives to logging in on the log in page.
function LogInOptions() {
	return (
		<ul className={styles.list} data-testid="log-in-options">
			<li className={styles.listItem}>
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
