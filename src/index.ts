import './styles/styles.scss';
import errorPage from './pages/error/error'
import notFoundPage from "./pages/not-found/not-found";
import loginPage from "./pages/login/login";
import registrationPage from "./pages/registration/registration";
import settingsPage from "./pages/settings/settings";
import settingsChangeInfoPage from "./pages/settings-change-info/settings-change-info";
import chatPage from "./pages/chat/chat";
import {MainBlock} from "./blocks/main-block/main-block";

declare const window: any;

const mainPage = new MainBlock({});

const pages = {
	errorPage,
	notFoundPage,
	loginPage,
	registrationPage,
	settingsPage,
	settingsChangeInfoPage,
	chatPage,
	mainPage
}

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
	renderHomePage('mainPage');
});
