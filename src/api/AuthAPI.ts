import BaseAPI from '../utils/BaseAPI'
import { User } from '../interfaces/auth/user.interface'
import { LoginData } from '../interfaces/auth/login-data.interface'
import { RegistrationData } from '../interfaces/auth/registration-data.interface'

export class AuthAPI extends BaseAPI {


	private static instance: AuthAPI;

	constructor() {
		super('/auth');

		if (AuthAPI.instance) {
			return AuthAPI.instance;
		}

		AuthAPI.instance = this;
	}
	signin(data: LoginData) {
		return this.http.post<LoginData>('/signin',  data );
	}

	signup(data: RegistrationData) {
		return this.http.post<RegistrationData>('/signup',  data );
	}

	fetchUser(): Promise<User> {
		return this.http.get<User>('/user');
	}

	logout() {
		return this.http.post('/logout');
	}

	create = undefined;

	read = undefined;

	update = undefined;

	delete = undefined;
}

export default new AuthAPI();
