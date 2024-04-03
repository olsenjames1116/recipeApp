interface InputMessagesProps {
	messages: string[];
	inputMessagesRef: React.RefObject<HTMLUListElement>;
}

// Represents the input messages to show messages on a form to a user for clarity.
function InputMessages({ messages, inputMessagesRef }: InputMessagesProps) {
	return (
		<ul ref={inputMessagesRef}>
			{messages.map((message, index) => {
				return <li key={index}>{message}</li>;
			})}
		</ul>
	);
}

export default InputMessages;
