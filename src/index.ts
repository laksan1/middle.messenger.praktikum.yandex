import './styles/styles.scss';
import errorPage from './pages/error/error'
import notFoundPage from "./pages/not-found/not-found";

declare const window: any;

const pages = {
	errorPage,
	notFoundPage
};


const renderHomePage = (page: keyof typeof pages): void =>  {
	const main  = document.querySelector('#main')!;
	const addedPage = pages[page];
	if (addedPage) {
		main.innerHTML = '';
		main.append(addedPage.getContent()!);
		addedPage.dispatchComponentDidMount();
	}
}

window.changePage = renderHomePage;
window.addEventListener('DOMContentLoaded', () => {
	renderHomePage('notFoundPage');
});
