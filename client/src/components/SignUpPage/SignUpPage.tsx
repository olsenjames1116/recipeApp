import { useEffect } from 'react';
import AccountFormContainer from '../AccountFormContainer/AccountFormContainer';
import SignUpForm from '../SignUpForm/SignUpForm';

function SignUpPage() {
	useEffect(() => {
		document.title = 'Sign Up';
	});

	return (
		<main>
			<AccountFormContainer>
				<SignUpForm />
			</AccountFormContainer>
		</main>
	);
}

export default SignUpPage;
