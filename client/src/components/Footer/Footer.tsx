import styles from './Footer.module.scss';

// Represents the footer at the bottom of the page.
function Footer() {
	return (
		<footer className={styles.footer}>
			Built and designed by{' '}
			<a href="https://github.com/olsenjames1116">olsenjames1116</a>
		</footer>
	);
}

export default Footer;
