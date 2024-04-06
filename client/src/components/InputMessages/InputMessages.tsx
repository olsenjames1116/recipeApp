import styles from './InputMessages.module.scss';

interface InputMessagesProps {
	messages: string[];
	error: boolean;
}

// Represents the input messages to show messages on a form to a user for clarity.
function InputMessages({ messages, error }: InputMessagesProps) {
	return (
		<ul className={styles.list}>
			{messages.map((message, index) => {
				return (
					<li
						key={index}
						className={`${styles.listItem} ${
							error ? styles.error : styles.success
						}`}
					>
						{message}
					</li>
				);
			})}
		</ul>
	);
}

export default InputMessages;
