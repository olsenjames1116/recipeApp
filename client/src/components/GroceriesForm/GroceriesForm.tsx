import { useEffect, useRef } from 'react';
import GroceryItemInput from '../GroceryItemInput/GroceryItemInput';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/store';
import { addGroceries } from '../../redux/state/groceryListSlice';

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
	const groceryList = useSelector(
		(state: IRootState) => state.groceryList.value
	);

	const listRef = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		// Get a user's stored groceries from their profile.
		const getGroceries = async () => {
			try {
				const response = await api.get('/user/groceries');

				dispatch(addGroceries(response.data.groceries));
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

	// Reached when a checkbox on the form has been checked or unchecked.
	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.classList.toggle('strikethrough');
		const { id, checked } = event.currentTarget;

		// Store the change to the checked attribute in the db.
		try {
			const response = await api.post('/user/grocery', {
				id: id,
				checked: checked,
			});

			dispatch(addGroceries(response.data.groceries));
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

	// Delete item from grocery list.
	const deleteGroceryItem = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		const id = (event.target as HTMLButtonElement).parentElement?.id;

		try {
			const response = await api.delete(`/user/grocery/${id}`);

			dispatch(addGroceries(response.data.groceries));
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

	// Clear all items from grocery list.
	const clearList = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		try {
			const response = await api.delete('/user/groceries');

			dispatch(addGroceries(response.data.groceries));
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
				{groceryList.map((grocery) => (
					<li key={grocery._id} id={grocery._id}>
						<input
							type="checkbox"
							id={grocery._id}
							onChange={handleChange}
							className={grocery.checked ? 'strikethrough' : undefined}
							defaultChecked={grocery.checked}
						/>
						<label htmlFor={grocery._id}>{grocery.name}</label>
						<button onClick={deleteGroceryItem}>Remove</button>
					</li>
				))}
			</ul>
			<button>Print or Download</button>
			<button onClick={clearList}>Clear All</button>
		</form>
	);
}

export default GroceriesForm;
