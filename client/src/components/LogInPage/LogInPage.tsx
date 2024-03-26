import { useEffect } from 'react';
import AccountFormContainer from '../AccountFormContainer/AccountFormContainer';
import LogInForm from '../LogInForm/LogInForm';
import LogInOptions from '../LogInOptions/LogInOptions';
import ExternalAuthOptions from '../ExternalAuthOptions/ExternalAuthOptions';

function LogInPage() {
	useEffect(() => {
		document.title = 'Log In';
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
