// Represents the form to search stored recipes to add to planner.
function MealPlannerForm() {
	const searchForRecipe = () => {
		console.log('search recipe');
	};

	return (
		<form>
			<input type="text" />
			<button onClick={searchForRecipe}>Search</button>
		</form>
	);
}

export default MealPlannerForm;
