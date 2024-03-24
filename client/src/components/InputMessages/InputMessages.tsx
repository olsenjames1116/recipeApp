function InputMessages({ messages }: { messages: string[] }) {
	return (
		<ul>
			{messages.map((message, index) => {
				return <li key={index}>{message}</li>;
			})}
		</ul>
	);
}

export default InputMessages;
