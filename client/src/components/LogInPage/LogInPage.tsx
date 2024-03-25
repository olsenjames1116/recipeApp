import { useEffect } from 'react';
import AccountFormContainer from '../AccountFormContainer/AccountFormContainer';
import LogInForm from '../LogInForm/LogInForm';

function LogInPage() {
	useEffect(() => {
		document.title = 'Log In';
	});

	return (
		<main>
			<AccountFormContainer>
				<LogInForm />
			</AccountFormContainer>
		</main>
	);
}

export default LogInPage;
