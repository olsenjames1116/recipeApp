import styles from './Footer.module.scss';

// Represents the footer at the bottom of the page.
function Footer() {
	return (
		<footer className={styles.footer} data-testid="footer">
			© 2024 James Olsen. All Rights Reserved.
			<p>
				Built and designed by
				<a href="https://github.com/olsenjames1116" className={styles.link}>
					olsenjames1116
				</a>
			</p>
		</footer>
	);
}

export default Footer;
