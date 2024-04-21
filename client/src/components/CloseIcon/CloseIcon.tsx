import { closeBlackIcon } from '../../assets/images';
import styles from './CloseIcon.module.scss';

interface CloseIconProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the icon to close a menu.
function CloseIcon({ setDisplayMenu }: CloseIconProps) {
	return (
		<img
			src={closeBlackIcon}
			alt="Close the menu"
			onClick={() => setDisplayMenu(false)}
			className={styles.image}
			tabIndex={0}
			data-cy="close-icon"
		/>
	);
}

export default CloseIcon;
