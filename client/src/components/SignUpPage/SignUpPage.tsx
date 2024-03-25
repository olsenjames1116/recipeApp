import { useEffect } from 'react';
import AccountFormContainer from '../AccountFormContainer/AccountFormContainer';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignUpOptions from '../SignUpOptions/SignUpOptions';

function SignUpPage() {
	useEffect(() => {
		document.title = 'Sign Up';
	});

	return (
		<main>
			<AccountFormContainer>
				<SignUpForm />
				<SignUpOptions />
			</AccountFormContainer>
		</main>
	);
}

export default SignUpPage;
