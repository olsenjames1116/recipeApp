interface AddMealToPlannerProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddMealToPlannerButton({ setDisplayMenu }: AddMealToPlannerProps) {
	const addMealToPlanner = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		setDisplayMenu(false);

		console.log('add meal to planner');
	};

	return <button onClick={addMealToPlanner}>Add</button>;
}

export default AddMealToPlannerButton;
