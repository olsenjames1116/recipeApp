const serverURI = import.meta.env.VITE_SERVER_URI
	? `${import.meta.env.VITE_SERVER_URI}`
	: 'http://localhost:3000/api';

// Represents the form to log in using Google.
function GoogleAuthForm() {
	return (
		<li>
			<form action={`${serverURI}/user/auth/google`}>
				<button>Google</button>
			</form>
		</li>
	);
}

export default GoogleAuthForm;
