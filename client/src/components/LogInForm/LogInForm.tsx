import { useRef, useState } from 'react';
import InputMessages from '../InputMessages/InputMessages';
import { AxiosError } from 'axios';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import UsernameInput from '../UsernameInput/UsernameInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import styles from './LogInForm.module.scss';

// Represents the log in form to authenticate a user.
function LogInForm() {
	const [inputMessages, setInputMessages] = useState<string[]>([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	// Clear all input in the form.
	const clearInput = () => {
		if (usernameRef.current) usernameRef.current.value = '';
		if (passwordRef.current) passwordRef.current.value = '';
	};

	// Reached when there is an error detected from front end validation.
	const handleInputError = () => {
		/* Each check will determine what cause the error and display the appropriate error 
		message for clarity. */
		if (!usernameRef.current?.checkValidity()) {
			usernameRef.current?.validity.valueMissing &&
				setInputMessages((state) => [...state, 'Username must not be empty.']);

			usernameRef.current?.validity.tooLong &&
				setInputMessages((state) => [
					...state,
					'Username must be less than 50 characters.',
				]);
		}

		if (!passwordRef.current?.checkValidity()) {
			passwordRef.current?.validity.valueMissing &&
				setInputMessages((state) => [...state, 'Password must not be empty.']);

			passwordRef.current?.validity.tooLong &&
				setInputMessages((state) => [
					...state,
					'Password must be less than 50 characters.',
				]);
		}

		clearInput();
	};

	// Send input to the backend.
	const logIn = async () => {
		try {
			await api.post('/user/log-in', {
				username: username,
				password: password,
			});

			navigate('/');
		} catch (error) {
			if (
				error instanceof AxiosError &&
				(error.response?.status === 400 || error.response?.status === 401)
			) {
				// 400 error code is sent from the backend if data from the form is invalid.
				const { message } = error.response.data;
				// Style message from backend to appear as invalid.
				setError(true);
				// Display message from backend.
				setInputMessages([...message]);
			} else {
				// A catch all for errors produced from api call.
				console.log(error);
			}
		}
	};

	// Reached when the form has been submitted.
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setInputMessages([]);

		if (!event.currentTarget.checkValidity()) {
			setError(true);
			handleInputError();
		} else {
			// If input is valid, below will execute.
			logIn();
			clearInput();
		}

		setUsername('');
		setPassword('');
	};

	// Reached when a change has been made to an input field.
	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = target;

		// Determine which field was changed to store change in state.
		switch (id) {
			case 'username':
				setUsername(value);
				break;
			case 'password':
				setPassword(value);
				break;
			default:
				console.log('None of the input ids matched.');
		}
	};

	return (
		<form
			method="POST"
			onSubmit={handleSubmit}
			noValidate
			className={styles.form}
		>
			<UsernameInput handleChange={handleChange} usernameRef={usernameRef} />
			<PasswordInput handleChange={handleChange} passwordRef={passwordRef} />
			<InputMessages messages={inputMessages} error={error} />
			<button className={styles.button} data-testid="log-in-submit">
				Log In
			</button>
		</form>
	);
}

export default LogInForm;
