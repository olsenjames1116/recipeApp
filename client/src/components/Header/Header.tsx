import api from '../../axiosConfig';

function Header() {
	const handleClick = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		const response = await api.delete('/user/log-out');

		console.log(response);
	};

	return <button onClick={handleClick}>Log Out</button>;
}

export default Header;
