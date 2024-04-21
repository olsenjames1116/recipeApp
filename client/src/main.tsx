import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

async function deferRender() {
	// if (import.meta.env.MODE !== 'development') {
	// 	return;
	// }

	// const { worker } = await import('./mocks/browser');
	// return worker.start();
	return;
}

deferRender().then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</React.StrictMode>
	);
});
