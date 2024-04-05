import { useEffect } from 'react';
import AccountFormContainer from '../AccountFormContainer/AccountFormContainer';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignUpOptions from '../SignUpOptions/SignUpOptions';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpPage.module.scss';

// Represents the sign up page to create new users.
function SignUpPage() {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Sign Up';

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
		<main className={styles.main}>
			<AccountFormContainer>
				<SignUpForm />
				<SignUpOptions />
			</AccountFormContainer>
		</main>
	);
}

export default SignUpPage;
