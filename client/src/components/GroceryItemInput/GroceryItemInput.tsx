import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import InputMessages from '../InputMessages/InputMessages';
import api from '../../axiosConfig';

interface GroceryItemInputProps {
	inputMenuRef: React.RefObject<HTMLLIElement>;
	displayInput: boolean;
	setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the input to add a new item to the grocery list.
function GroceryItemInput({
	inputMenuRef,
	displayInput,
	setDisplayInput,
}: GroceryItemInputProps) {
	const [inputMessages, setInputMessages] = useState<string[]>([]);
	const [item, setItem] = useState<string>('');

	const inputMessagesRef = useRef<HTMLUListElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	useEffect(() => {
		// Adds an event listener to hide the ingredient search menu.
		document.addEventListener('mousedown', (event: MouseEvent) => {
			// If the menu is displayed and the event occurred outside of the menu, hide menu.
			if (
				displayInput &&
				!inputMenuRef.current?.contains(event.target as Node)
			) {
				setDisplayInput(false);
			}
		});
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setItem(value);
	};

	// Reached when there is an error detected from front end valdation.
	const handleInputError = () => {
		/* Each check will determine what caused the error and display the appropriate error
        message for clairty. */
		inputRef.current?.validity.valueMissing &&
			setInputMessages(['Item input must not be empty.']);

		inputRef.current?.validity.tooLong &&
			setInputMessages(['Item input must be less than 50 characters.']);
	};

	// Add grocery item to stored groceries in db.
	const addItemToList = async () => {
		try {
			const response = await api.post('/user/save-grocery-item', {
				item: item,
			});

			console.log(response);
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 403) {
				/* 403 error code is sent from backend if user has not been authenticated. 
					Navigate user back to log in page to authenticate. */
				navigate('/log-in');
			} else if (
				error instanceof AxiosError &&
				error.response?.status === 400
			) {
				// 400 error code is sent from the backend if data from the form is invalid.
				const { message } = error.response.data;
				// Style message from backend to appear as invalid.
				if (inputMessagesRef.current)
					inputMessagesRef.current.style.color = 'red';
				// Display message from backend.
				setInputMessages([...message]);
			} else {
				// A catch all for errors produced from api call.
				console.log(error);
			}
		}
	};

	const validateInput = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		setInputMessages([]);

		if (!inputRef.current?.checkValidity()) {
			if (inputMessagesRef.current)
				inputMessagesRef.current.style.color = 'red';
			handleInputError();
		} else {
			addItemToList();
			inputRef.current.value = '';
		}
	};

	// Cancels and hides input.
	const cancelItem = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		setDisplayInput(false);
	};

	return (
		<li ref={inputMenuRef}>
			<input
				type="text"
				placeholder="Enter item to add..."
				onChange={handleChange}
				ref={inputRef}
				required
				maxLength={50}
			/>
			<InputMessages
				messages={inputMessages}
				inputMessagesRef={inputMessagesRef}
			/>
			<button onClick={validateInput}>Add</button>
			<button onClick={cancelItem}>Cancel</button>
		</li>
	);
}

export default GroceryItemInput;
