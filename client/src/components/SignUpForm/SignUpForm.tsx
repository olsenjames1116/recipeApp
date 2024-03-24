import { useEffect, useRef, useState } from 'react';
import api from '../../axiosConfig';

// Represents the sign up form to create a new user.
function SignUpForm() {
	const [inputMessages, setInputMessages] = useState<string[]>([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		console.log(inputMessages);
	}, [inputMessages]);

	// Send input to the backend.
	const signUp = async () => {
		try {
			const response = await api.post('/user/sign-up', {
				username: username,
				password: password,
				confirmPassword: confirmPassword,
			});

			// This is reached if all input is valid.
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

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
					'Username must be less than 20 characters.',
				]);
		}

		if (!passwordRef.current?.checkValidity()) {
			passwordRef.current?.validity.valueMissing &&
				setInputMessages((state) => [...state, 'Password must not be empty.']);

			passwordRef.current?.validity.tooLong &&
				setInputMessages((state) => [
					...state,
					'Password must be less than 20 characters.',
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
					'Confirmation password must be less than 20 characters.',
				]);
		}

		if (confirmPasswordRef.current?.value !== passwordRef.current?.value) {
			setInputMessages((state) => [...state, 'Passwords must match.']);
		}

		clearInput();
	};

	// Reached when the form has been submitted.
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setInputMessages([]);

		// if (
		// 	!event.currentTarget.checkValidity() ||
		// 	confirmPasswordRef.current?.value !== passwordRef.current?.value
		// ) {
		// 	handleInputError();
		// } else {
		// If input is valid, the below will execute.
		signUp();
		// }
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
				console.log('None of the ids matched');
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
				maxLength={20}
			/>
			<input
				id="password"
				type="password"
				placeholder="password"
				onChange={handleChange}
				ref={passwordRef}
				required
				maxLength={20}
			/>
			<input
				id="confirmPassword"
				type="password"
				placeholder="confirm password"
				onChange={handleChange}
				ref={confirmPasswordRef}
				required
				maxLength={20}
			/>
			<button>Sign Up</button>
		</form>
	);
}

export default SignUpForm;
