// Represents the external options a user can use to log in.
import GoogleAuthForm from '../GoogleAuthForm/GoogleAuthForm';

function ExternalAuthOptions() {
	return (
		<ul data-testid="external-auth-options">
			<GoogleAuthForm />
		</ul>
	);
}

export default ExternalAuthOptions;
