import { useEffect, useState } from 'react';

function SignUpPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		document.title = 'Sign Up';
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('sign up form submit');
	};

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = target;

		switch (id) {
			case 'username':
				setUsername(value);
				console.log(value);
				break;
			case 'password':
				setPassword(value);
				console.log(value);
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				console.log(value);
				break;
			default:
				console.log('None of the ids matched');
		}
	};

	return (
		<main>
			<div>
				<img src="" alt="" />
				<span>App Title</span>
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
			</div>
		</main>
	);
}

export default SignUpPage;
