import { useState } from 'react';
import GroceriesForm from '../GroceriesForm/GroceriesForm';
import IngredientsOnHand from '../IngredientsOnHand/IngredientsOnHand';

interface GroceriesContentProps {
	inputRef: React.RefObject<HTMLLIElement>;
}

// Represents the content displayed on the groceries page.
function GroceriesContent({ inputRef }: GroceriesContentProps) {
	const [displayInput, setDisplayInput] = useState(false);

	return (
		<main>
			<IngredientsOnHand />
			<GroceriesForm
				inputRef={inputRef}
				displayInput={displayInput}
				setDisplayInput={setDisplayInput}
			/>
		</main>
	);
}

export default GroceriesContent;
