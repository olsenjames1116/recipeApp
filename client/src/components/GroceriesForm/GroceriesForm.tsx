import { useEffect, useRef } from 'react';
import GroceryItemInput from '../GroceryItemInput/GroceryItemInput';
import api from '../../axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/store';
import { addGroceries } from '../../redux/state/groceryListSlice';
import GroceryListItem from '../GroceryListItem/GroceryListItem';
import ReactToPrint from 'react-to-print';
import styles from './GroceriesForm.module.scss';

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
	const printFrameRef = useRef(null);

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

	// Displays the input element to enter a new grocery list item.
	const displayInputElement = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		setDisplayInput(true);
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
		<form
			onSubmit={(event) => event.preventDefault()}
			noValidate
			ref={printFrameRef}
			className={styles.form}
		>
			<span className={styles.span}>Groceries:</span>
			<ul ref={listRef} className={styles.list}>
				{!displayInput && (
					<li className={`${styles.button} ${styles.addItemButton}`}>
						<button
							onClick={displayInputElement}
							className={styles.button}
							data-testid="groceries-form-add-button"
						>
							+Add Item
						</button>
					</li>
				)}
				{displayInput && (
					<GroceryItemInput
						inputMenuRef={inputMenuRef}
						displayInput={displayInput}
						setDisplayInput={setDisplayInput}
					/>
				)}
				{groceryList.map((grocery, index) => (
					<GroceryListItem key={grocery._id} grocery={grocery} index={index} />
				))}
			</ul>
			<ReactToPrint
				bodyClass="print-agreement"
				content={() => printFrameRef.current}
				trigger={() => (
					<button className={`${styles.button} ${styles.printButton}`}>
						Print or Download
					</button>
				)}
			/>
			<button
				onClick={clearList}
				className={`${styles.button} ${styles.clearButton}`}
				data-testid="groceries-form-clear-button"
			>
				Clear All
			</button>
		</form>
	);
}

export default GroceriesForm;
