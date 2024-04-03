import { useEffect } from 'react';
import AccountFormContainer from '../AccountFormContainer/AccountFormContainer';
import LogInForm from '../LogInForm/LogInForm';
import LogInOptions from '../LogInOptions/LogInOptions';
import ExternalAuthOptions from '../ExternalAuthOptions/ExternalAuthOptions';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// Represents the log in page to authenticate users.
function LogInPage() {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Log In';

		// Call to api to determine if user has been authenticated.
		const denyAuthenticatedUser = async () => {
			try {
				await api.get('/user/logged-out');
			} catch (error) {
				if (error instanceof AxiosError && error.response?.status === 403) {
					/* 403 error is sent from backend if user has been authenticated. 
					Navigate user back to home page. */
					navigate('/');
				} else {
					// A catch all for errors produced from api call.
					console.log(error);
				}
			}
		};

		denyAuthenticatedUser();
	});

	return (
		<main>
			<AccountFormContainer>
				<ExternalAuthOptions />
				<LogInForm />
				<LogInOptions />
			</AccountFormContainer>
		</main>
	);
}

export default LogInPage;
