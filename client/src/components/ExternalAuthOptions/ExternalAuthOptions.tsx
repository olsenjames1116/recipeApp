const serverURI = import.meta.env.SERVER_URI
	? `${import.meta.env.SERVER_URI}`
	: 'http://localhost:3000/api';

function ExternalAuthOptions() {
	return (
		<form action={`${serverURI}/user/auth/google`}>
			<button>Google</button>
		</form>
	);
}

export default ExternalAuthOptions;
