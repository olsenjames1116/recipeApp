interface AccountFormContainerProps {
	children: React.ReactNode;
}

function AccountFormContainer({ children }: AccountFormContainerProps) {
	return (
		<div>
			<img src="" alt="" />
			<span>App Title</span>
			<span>Slogan</span>
			{children}
		</div>
	);
}

export default AccountFormContainer;
