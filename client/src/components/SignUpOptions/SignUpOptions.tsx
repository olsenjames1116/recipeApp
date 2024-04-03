import { Link } from 'react-router-dom';

// Represents the alternatives to signing up for a new account.
function SignUpOptions() {
	return (
		<ul>
			<li>
				Already have an account? <Link to="/log-in">Log In</Link>
			</li>
		</ul>
	);
}

export default SignUpOptions;
