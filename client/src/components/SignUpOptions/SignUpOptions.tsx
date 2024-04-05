import { Link } from 'react-router-dom';
import styles from './SignUpOptions.module.scss';

// Represents the alternatives to signing up for a new account.
function SignUpOptions() {
	return (
		<ul>
			<li className={styles.listItem}>
				Already have an account? <Link to="/log-in">Log In</Link>
			</li>
		</ul>
	);
}

export default SignUpOptions;
