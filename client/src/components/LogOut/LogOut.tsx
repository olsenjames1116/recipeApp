import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

function LogOut() {
	const navigate = useNavigate();

	// Remove user's credentials from the backend.
	const logUserOut = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		try {
			await api.delete('/user/log-out');

			// Reached after a successful call from the backend.
			navigate('/log-in');
		} catch (error) {
			// A catch all for errors produced from api call.
			console.log(error);
		}
	};

	return (
		<li>
			<button onClick={logUserOut}>Log Out</button>
		</li>
	);
}

export default LogOut;