import { closeBlackIcon } from '../../assets/images';

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
		/>
	);
}

export default CloseIcon;
