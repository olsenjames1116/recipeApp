import { useRef, useState } from 'react';
import api from '../../axiosConfig';
import InputMessages from '../InputMessages/InputMessages';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import UsernameInput from '../UsernameInput/UsernameInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import ConfirmPasswordInput from '../ConfirmPasswordInput/ConfirmPasswordInput';
import styles from './SignUpForm.module.scss';

// Represents the sign up form to create a new user.
function SignUpForm() {
	const [inputMessages, setInputMessages] = useState<string[]>([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	// Clear all input in the form.
	const clearInput = () => {
		if (usernameRef.current) usernameRef.current.value = '';
		if (passwordRef.current) passwordRef.current.value = '';
		if (confirmPasswordRef.current) confirmPasswordRef.current.value = '';
	};

	// Reached when there is an error detected from front end validation.
	const handleInputError = () => {
		// Each check will determine what caused the error and display the appropriate error message for clarity.
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

		if (!confirmPasswordRef.current?.checkValidity()) {
			confirmPasswordRef.current?.validity.valueMissing &&
				setInputMessages((state) => [
					...state,
					'Confirmation password must not be empty.',
				]);

			confirmPasswordRef.current?.validity.tooLong &&
				setInputMessages((state) => [
					...state,
					'Confirmation password must be less than 50 characters.',
				]);
		}

		if (confirmPasswordRef.current?.value !== passwordRef.current?.value) {
			setInputMessages((state) => [...state, 'Passwords must match.']);
		}

		clearInput();
	};

	// Reached if backend validation and user storage was successful.
	const handleSuccess = (message: string[]) => {
		// Style message from backend to appear valid.
		setError(false);

		// Display message from backend.
		setInputMessages(message);

		// Redirect the user to log in with their account.
		setTimeout(() => {
			navigate('/log-in');
		}, 3000);
	};

	// Send input to the backend.
	const signUp = async () => {
		try {
			const response = await api.post('/user/sign-up', {
				username: username,
				password: password,
				confirmPassword: confirmPassword,
			});

			// This is reached if all input is valid.
			handleSuccess(response.data.message);
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 400) {
				// A 400 error code is sent from the backend if data from the request was invalid.
				const { message } = error.response.data;
				// Style message from backend to appear as invalid.
				setError(true);
				// Display validation errors from backend.
				setInputMessages([...message]);
			} else {
				console.log(error);
			}
		}
	};

	// Reached when the form has been submitted.
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setInputMessages([]);

		if (
			!event.currentTarget.checkValidity() ||
			confirmPasswordRef.current?.value !== passwordRef.current?.value
		) {
			setError(true);
			handleInputError();
		} else {
			// If input is valid, the below will execute.
			signUp();
			clearInput();
		}

		setUsername('');
		setPassword('');
		setConfirmPassword('');
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
			case 'confirmPassword':
				setConfirmPassword(value);
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
			data-testid="sign-up-form"
		>
			<UsernameInput handleChange={handleChange} usernameRef={usernameRef} />
			<PasswordInput handleChange={handleChange} passwordRef={passwordRef} />
			<ConfirmPasswordInput
				handleChange={handleChange}
				confirmPasswordRef={confirmPasswordRef}
			/>
			<InputMessages messages={inputMessages} error={error} />
			<button className={styles.button} data-testid="signup-submit-button">
				Sign Up
			</button>
		</form>
	);
}

export default SignUpForm;
