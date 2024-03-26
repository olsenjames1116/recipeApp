const serverURI = import.meta.env.SERVER_URI
	? `${import.meta.env.SERVER_URI}`
	: 'http://localhost:3000/api';

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
