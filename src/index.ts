import './styles/styles.scss';
import notFoundPage from './pages/not-found/not-found';
import loginPage from './pages/login/login';
import Router from './utils/Router';
import { Routes } from './enums/routes.enum';
import registrationPage from './pages/registration/registration';
import settingsPage from './pages/settings/settings';
import errorPage from './pages/error/error';
import AuthController from './controllers/AuthController';
import store from './utils/Store';
import settingsChangeInfoPage from './pages/settings-change-info/settings-change-info';
import chatPage from './pages/chat/chat';

declare const window: any;

window.addEventListener('DOMContentLoaded', async () => {
	Router.setNotFound(Routes.PageNotFound, notFoundPage)
		.use(Routes.Login, loginPage)
		.use(Routes.Register, registrationPage)
		.use(Routes.Settings, settingsPage)
		.use(Routes.SettingsEdit, settingsChangeInfoPage)
		.use(Routes.Messenger, chatPage)
		.use(Routes.ServiceError, errorPage)
		.onBeforeRouterGo(async (to) => {
			let isProtected = true;
			switch (to.getPathname()) {
				case Routes.Login:
				case Routes.Register:
					isProtected = false;
					break;
			}
			if (isProtected) {
				if (store.getState().user.user_data) {
					return true;
				}
				try {
					await AuthController.fetchUser();
					return true;
				} catch (e) {
					Router.go(Routes.Login);
					return false;
				}
			} else {
				if (store.getState().user.user_data) {
					Router.go(Routes.Settings);
					return false;
				}
				try {
					await AuthController.fetchUser();
					Router.go(Routes.Settings);
					return false;
				} catch (e) {
					return true;
				}
			}
		});

	Router.start();
});
