import styles from './UsernameInput.module.scss';

interface UsernameInputProps {
	handleChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
	usernameRef: React.RefObject<HTMLInputElement>;
}

// Represents the username input for the authentication pages.
function UsernameInput({ handleChange, usernameRef }: UsernameInputProps) {
	return (
		<input
			id="username"
			type="text"
			placeholder="username"
			onChange={handleChange}
			ref={usernameRef}
			required
			maxLength={50}
			className={styles.input}
		/>
	);
}

export default UsernameInput;
