import API, { AuthAPI } from '../api/AuthAPI';
import { LoginData } from '../interfaces/auth/login-data.interface';
import { RegistrationData } from '../interfaces/auth/registration-data.interface';
import router from '../utils/Router';
import store from '../utils/Store';
import { Routes } from '../enums/routes.enum';
import MessagesController from './MessagesController';

class AuthController {
	private readonly api: AuthAPI;

	constructor() {
		this.api = API;
	}

	async signin(data: LoginData) {
		try {
			await this.api.signin(data);
			await this.fetchUser();
			router.go(Routes.Settings);
			return;
		} catch (e: any) {
			console.error(e);
			return e;
		}
	}

	async signup(data: RegistrationData) {
		try {
			await this.api.signup(data);
			await this.fetchUser();
			router.go(Routes.Settings);
			return;
		} catch (e: any) {
			console.error(e);
			return e;
		}
	}

	async fetchUser() {
		const user = await this.api.fetchUser();
		store.set('user.user_data', user);
	}

	async logout() {
		try {
			await this.api.logout();
			store.set('user.user_data', null);
			store.set('currentChatId', null);
			MessagesController.closeAll();
			router.go(Routes.Login);
		} catch (e: any) {
			console.error(e.message);
		}
	}
}

export default new AuthController();
