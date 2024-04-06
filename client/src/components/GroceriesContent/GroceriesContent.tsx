import { useState } from 'react';
import GroceriesForm from '../GroceriesForm/GroceriesForm';
import IngredientsOnHand from '../IngredientsOnHand/IngredientsOnHand';
import styles from './GroceriesContent.module.scss';

interface GroceriesContentProps {
	inputMenuRef: React.RefObject<HTMLLIElement>;
}

// Represents the content displayed on the groceries page.
function GroceriesContent({ inputMenuRef }: GroceriesContentProps) {
	const [displayInput, setDisplayInput] = useState(false);

	return (
		<main className={styles.main}>
			<IngredientsOnHand />
			<GroceriesForm
				inputMenuRef={inputMenuRef}
				displayInput={displayInput}
				setDisplayInput={setDisplayInput}
			/>
		</main>
	);
}

export default GroceriesContent;
