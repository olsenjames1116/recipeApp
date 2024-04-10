import { googleIcon } from '../../assets/images';
import styles from './GoogleAuthForm.module.scss';

// Dynamically set the server uri for development or production.
const serverURI = import.meta.env.VITE_SERVER_URI
	? `${import.meta.env.VITE_SERVER_URI}`
	: 'http://localhost:3000';

// Represents the form to log in using Google.
function GoogleAuthForm() {
	return (
		<li>
			<form action={`${serverURI}/user/auth/google`} className={styles.form}>
				<button className={styles.button}>
					<img src={googleIcon} alt="" className={styles.icon} />
					Continue with Google
				</button>
			</form>
		</li>
	);
}

export default GoogleAuthForm;
