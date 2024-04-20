import styles from './InputMessages.module.scss';

interface InputMessagesProps {
	messages: string[];
	error: boolean;
}

// Represents the input messages to show messages on a form to a user for clarity.
function InputMessages({ messages, error }: InputMessagesProps) {
	return (
		<ul className={styles.list} data-testid="input-messages">
			{messages.map((message, index) => {
				return (
					<li
						key={index}
						className={`${styles.listItem} ${error ? styles.error : ''}`}
					>
						{message}
					</li>
				);
			})}
		</ul>
	);
}

export default InputMessages;
