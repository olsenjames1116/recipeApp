import { useEffect, useRef } from 'react';
import api from '../../axiosConfig';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import HomeContent from '../HomeContent/HomeContent';
import { useDispatch } from 'react-redux';
import { removeRandomRecipe } from '../../redux/state/randomRecipeSlice';
import styles from './HomePage.module.scss';

// Represents the home page.
function HomePage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.title = 'Home';

		// Check if a user is authenticated and should have access.
		const authenticateUser = async () => {
			try {
				await api.get('/user/authenticate');
			} catch (error) {
				if (error instanceof AxiosError && error.response?.status === 403) {
					/* 403 error code is sent from backend if user has not been authenticated. 
					Navigate user back to log in page to authenticate. */
					navigate('/log-in');
				} else {
					// A catch all for errors produced from api call.
					console.log(error);
				}
			}
		};

		authenticateUser();

		// Remove recipe stored in state when home page is navigated to.
		dispatch(removeRandomRecipe());
	});

	return (
		<div className={styles.page}>
			<Header />
			<HomeContent menuRef={menuRef} />
		</div>
	);
}

export default HomePage;
