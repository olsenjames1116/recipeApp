import { Link } from 'react-router-dom';

function SignUpOptions() {
	return (
		<ul>
			<li>
				Already have an account? <Link to="/log-in">Sign In</Link>
			</li>
		</ul>
	);
}

export default SignUpOptions;
