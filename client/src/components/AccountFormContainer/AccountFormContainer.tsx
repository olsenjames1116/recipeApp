import { logoIcon } from '../../assets/images';
import styles from './AccountFormContainer.module.scss';

// Represents the container for the form on the log in and sign up pages.
function AccountFormContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className={styles.container}>
			<img src={logoIcon} alt="" className={styles.icon} />
			<span>Whisk</span>
			<span>Slogan</span>
			{children}
		</div>
	);
}

export default AccountFormContainer;
