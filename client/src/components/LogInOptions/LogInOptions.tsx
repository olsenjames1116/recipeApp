import DemoAccountLogIn from '../DemoAccountLogIn/DemoAccountLogIn';

function LogInOptions() {
	return (
		<ul>
			<li>
				Don't have an account? <a href="/sign-up">Create One</a>
			</li>
			<DemoAccountLogIn />
		</ul>
	);
}

export default LogInOptions;
