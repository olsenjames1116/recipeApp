import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

// Represents the component to log in as a demo user.
function DemoAccountLogIn() {
	const navigate = useNavigate();

	// Log in the user to the demo account.
	const logInDemoAccount = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event?.preventDefault();

		try {
			await api.post('/user/log-in', {
				username: 'demo',
				password: '123',
			});

			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<li>
			or use the Demo Account{' '}
			<button onClick={logInDemoAccount}>Demo Account</button>
		</li>
	);
}

export default DemoAccountLogIn;
