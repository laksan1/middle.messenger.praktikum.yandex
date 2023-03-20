import './styles/styles.scss';
import notFoundPage from './pages/not-found/not-found';
import loginPage from './pages/login/login';
import Router from './utils/Router';
import { Routes } from './enums/routes.enum';
import Block from './utils/Block';
import registrationPage from './pages/registration/registration';
import settingsPage from './pages/settings/settings';
import errorPage from './pages/error/error';
import AuthController from './controllers/AuthController';
import store from './utils/Store';
import settingsChangeInfoPage from './pages/settings-change-info/settings-change-info';
import chatPage from './pages/chat/chat';

declare const window: any;

// const mainPage = new MainBlock({})

window.addEventListener('DOMContentLoaded', async () => {
	Router.setNotFound(Routes.PageNotFound, notFoundPage as typeof Block)
		.use(Routes.Login, loginPage as typeof Block)
		.use(Routes.Register, registrationPage as typeof Block)
		.use(Routes.Settings, settingsPage as typeof Block)
		.use(Routes.SettingsEdit, settingsChangeInfoPage as unknown as typeof Block)
		.use(Routes.Messenger, chatPage as typeof Block)
		.use(Routes.ServiceError, errorPage as typeof Block)
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
