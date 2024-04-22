import { Link } from 'react-router-dom';
import styles from './SignUpOptions.module.scss';

// Represents the alternatives to signing up for a new account.
function SignUpOptions() {
	return (
		<ul>
			<li className={styles.listItem} data-testid="sign-up-options">
				Already have an account?{' '}
				<Link to="/log-in" className={styles.link}>
					Log In
				</Link>
			</li>
		</ul>
	);
}

export default SignUpOptions;
