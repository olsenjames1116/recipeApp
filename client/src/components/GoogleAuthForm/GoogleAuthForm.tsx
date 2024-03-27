const serverURI = import.meta.env.VITE_SERVER_URI
	? `${import.meta.env.VITE_SERVER_URI}`
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
