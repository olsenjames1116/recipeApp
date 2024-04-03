import { useEffect, useRef } from 'react';
import GroceryItemInput from '../GroceryItemInput/GroceryItemInput';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface GroceriesFormProps {
	inputMenuRef: React.RefObject<HTMLLIElement>;
	displayInput: boolean;
	setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the form to add new items to the grocery list.
function GroceriesForm({
	inputMenuRef,
	displayInput,
	setDisplayInput,
}: GroceriesFormProps) {
	const listRef = useRef(null);

	const navigate = useNavigate();

	useEffect(() => {
		// Get a user's stored groceries from their profile.
		const getGroceries = async () => {
			try {
				const response = await api.get('/user/groceries');

				console.log(response);
			} catch (error) {
				if (error instanceof AxiosError && error.response?.status === 403) {
					/* 403 error code is sent from backend if user has not been authenticated. 
					Navigate user back to log in page to authenticate. */
					navigate('/log-in');
				} else {
					// A catch all for errors produced from api call.
					console.log(error);
				}
			}
		};

		getGroceries();
	}, []);

	const printOrDownloadList = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('print or download list');
	};

	// Displays the input element to enter a new grocery list item.
	const displayInputElement = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		setDisplayInput(true);
	};

	const clearList = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		console.log('clear list');
	};

	return (
		<form onSubmit={printOrDownloadList} noValidate>
			<span>Groceries:</span>
			<ul ref={listRef}>
				<li>
					<button onClick={displayInputElement}>+Add Item</button>
				</li>
				{displayInput && (
					<GroceryItemInput
						inputMenuRef={inputMenuRef}
						displayInput={displayInput}
						setDisplayInput={setDisplayInput}
					/>
				)}
			</ul>
			<button>Print or Download</button>
			<button onClick={clearList}>Clear All</button>
		</form>
	);
}

export default GroceriesForm;
