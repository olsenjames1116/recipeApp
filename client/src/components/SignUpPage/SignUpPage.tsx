import { useEffect } from 'react';

function SignUpPage() {
	useEffect(() => {
		document.title = 'Sign Up';
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('sign up form submit');
	};

	return (
		<main>
			<div>
				<img src="" alt="" />
				<span>App Title</span>
				<form method="POST" onSubmit={handleSubmit}>
					<input type="text" />
					<input type="password" />
					<button>Sign Up</button>
				</form>
			</div>
		</main>
	);
}

export default SignUpPage;
