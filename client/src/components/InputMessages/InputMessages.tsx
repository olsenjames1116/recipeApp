interface InputMessagesProps {
	messages: string[];
	inputMessagesRef: React.RefObject<HTMLUListElement>;
}

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
