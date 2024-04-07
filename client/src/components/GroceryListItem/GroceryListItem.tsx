import { IGrocery } from '../../types';
import api from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { addGroceries } from '../../redux/state/groceryListSlice';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './GroceryListItem.module.scss';

interface GroceryListItemProps {
	grocery: IGrocery;
}

// Represents an item from the grocery list.
function GroceryListItem({ grocery }: GroceryListItemProps) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	return (
		<li key={grocery._id} id={grocery._id} className={styles.listItem}>
			<input
				type="checkbox"
				id={grocery._id}
				onChange={handleChange}
				defaultChecked={grocery.checked}
				className={styles.input}
			/>
			<label
				htmlFor={grocery._id}
				className={`${styles.label} ${grocery.checked ? styles.strike : ''}`}
			>
				{grocery.name}
			</label>
			<button onClick={deleteGroceryItem} className={styles.button}>
				Remove
			</button>
		</li>
	);
}

export default GroceryListItem;
