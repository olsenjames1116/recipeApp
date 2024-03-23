import { useState } from 'react';
import api from '../../axiosConfig';

function SignUpForm() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// Send input to the backend.
	const signUp = async () => {
		try {
			const response = await api.post('/user/sign-up', {
				username: username,
				password: password,
				confirmPassword: confirmPassword,
			});

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	// Reached when the form has been submitted.
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('sign up form submit');

		signUp();
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
		<form method="POST" onSubmit={handleSubmit}>
			<input
				id="username"
				type="text"
				placeholder="username"
				onChange={handleChange}
			/>
			<input
				id="password"
				type="password"
				placeholder="password"
				onChange={handleChange}
			/>
			<input
				id="confirmPassword"
				type="password"
				placeholder="confirm password"
				onChange={handleChange}
			/>
			<button>Sign Up</button>
		</form>
	);
}

export default SignUpForm;
