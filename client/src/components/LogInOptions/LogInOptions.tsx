import { Link } from 'react-router-dom';
import DemoAccountLogIn from '../DemoAccountLogIn/DemoAccountLogIn';

// Represents the alternatives to logging in on the log in page.
function LogInOptions() {
	return (
		<ul>
			<li>
				Don't have an account? <Link to="/sign-up">Create One</Link>
			</li>
			<DemoAccountLogIn />
		</ul>
	);
}

export default LogInOptions;
