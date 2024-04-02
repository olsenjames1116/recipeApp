import { useRef, useEffect } from 'react';

interface GroceriesFormProps {
	inputRef: React.RefObject<HTMLLIElement>;
	displayInput: boolean;
	setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

function GroceriesForm({
	inputRef,
	displayInput,
	setDisplayInput,
}: GroceriesFormProps) {
	const listRef = useRef(null);

	useEffect(() => {
		// Adds an event listener to hide the ingredient search menu.
		document.addEventListener('mousedown', (event: MouseEvent) => {
			// If the menu is displayed and the event occurred outside of the menu, hide menu.
			if (
				displayInput &&
				!inputRef.current?.contains(event.currentTarget as Node)
			) {
				setDisplayInput(false);
			}
		});
	}, []);

	const printOrDownloadList = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('print or download list');
	};

	const displayInputElement = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		setDisplayInput(true);
	};

	const addItemToList = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		console.log('add item to list');
	};

	const cancelItem = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		setDisplayInput(false);
	};

	const clearList = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		console.log('clear list');
	};

	return (
		<form onSubmit={printOrDownloadList}>
			<span>Groceries:</span>
			<ul ref={listRef}>
				<li>
					<button onClick={displayInputElement}>+Add Item</button>
				</li>
				{displayInput && (
					<li ref={inputRef}>
						<input type="text" />
						<button onClick={addItemToList}>Add</button>
						<button onClick={cancelItem}>Cancel</button>
					</li>
				)}
			</ul>
			<button>Print or Download</button>
			<button onClick={clearList}>Clear All</button>
		</form>
	);
}

export default GroceriesForm;
