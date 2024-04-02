function GroceriesForm() {
	const printOrDownloadList = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('print or download list');
	};

	const addItemToList = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		console.log('add item to list');
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
			<ul>
				<li>
					<button onClick={addItemToList}>+Add Item</button>
				</li>
			</ul>
			<button>Print or Download</button>
			<button onClick={clearList}>Clear All</button>
		</form>
	);
}

export default GroceriesForm;
