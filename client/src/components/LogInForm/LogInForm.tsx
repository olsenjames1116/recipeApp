import { useRef, useState } from 'react';
import InputMessages from '../InputMessages/InputMessages';
import { AxiosError } from 'axios';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

// Represents the log in form to authenticate a user.
function LogInForm() {
	const [inputMessages, setInputMessages] = useState<string[]>([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const inputMessagesRef = useRef<HTMLUListElement>(null);

	const navigate = useNavigate();

	// Clear all input in the form.
	const clearInput = () => {
		if (usernameRef.current) usernameRef.current.value = '';
		if (passwordRef.current) passwordRef.current.value = '';
	};

	// Reached when there is an error detected from front end validation.
	const handleInputError = () => {
		// Each check will determine what cause the error and display the appropriate error message for clarity.
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

			// Reached if backend validation and user was found in database.

			// Navigate user to home page.
			navigate('/');
		} catch (error) {
			// Anything that reaches here is due to an error.
			if (
				error instanceof AxiosError &&
				(error.response?.status === 400 || error.response?.status === 401)
			) {
				// 400 error code is sent from the backend if data from the form is invalid.
				const { message } = error.response.data;
				// Style message from backend to appear as invalid.
				if (inputMessagesRef.current)
					inputMessagesRef.current.style.color = 'red';
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
			if (inputMessagesRef.current)
				inputMessagesRef.current.style.color = 'red';
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
		<form method="POST" onSubmit={handleSubmit} noValidate>
			<input
				id="username"
				type="text"
				placeholder="username"
				onChange={handleChange}
				ref={usernameRef}
				required
				maxLength={50}
			/>
			<input
				id="password"
				type="password"
				placeholder="password"
				onChange={handleChange}
				ref={passwordRef}
				required
				maxLength={50}
			/>
			<InputMessages
				messages={inputMessages}
				inputMessagesRef={inputMessagesRef}
			/>
			<button>Log In</button>
		</form>
	);
}

export default LogInForm;
