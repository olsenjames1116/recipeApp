import styles from './PasswordInput.module.scss';

interface PasswordInputProps {
	handleChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
	passwordRef: React.RefObject<HTMLInputElement>;
}

// Represents the password input for the authentication pages.
function PasswordInput({ handleChange, passwordRef }: PasswordInputProps) {
	return (
		<input
			id="password"
			type="password"
			placeholder="password"
			onChange={handleChange}
			ref={passwordRef}
			required
			maxLength={50}
			className={styles.input}
		/>
	);
}

export default PasswordInput;
