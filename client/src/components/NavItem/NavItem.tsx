import { Link } from 'react-router-dom';
import styles from './NavItem.module.scss';

interface NavItemProps {
	to: string;
	src: string;
	alt: string;
	title: string;
	className: string;
}

function NavItem({ to, src, alt, title, className }: NavItemProps) {
	return (
		<Link to={to} className={`${styles.link} ${className}`}>
			<img src={src} alt={alt} className={styles.image} />
			<span className={styles.span}>{title}</span>
		</Link>
	);
}

export default NavItem;
