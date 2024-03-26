import api from '../../axiosConfig';

function ExternalAuthOptions() {
	return (
		<form action={`${api}/user/auth/google`}>
			<button>Google</button>
		</form>
	);
}

export default ExternalAuthOptions;
