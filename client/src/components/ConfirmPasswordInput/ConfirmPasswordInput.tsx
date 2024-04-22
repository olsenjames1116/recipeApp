import React from 'react';
import styles from './ConfirmPassword.module.scss';

interface ConfirmPasswordInputProps {
	handleChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
	confirmPasswordRef: React.RefObject<HTMLInputElement>;
}

function ConfirmPasswordInput({
	handleChange,
	confirmPasswordRef,
}: ConfirmPasswordInputProps) {
	return (
		<input
			id="confirmPassword"
			type="password"
			placeholder="confirm password"
			onChange={handleChange}
			ref={confirmPasswordRef}
			required
			maxLength={50}
			className={styles.input}
			data-testid="confirm-password-input"
		/>
	);
}

export default ConfirmPasswordInput;
