import { UserPassword } from '../interfaces/user/user-password.interface'
import { User } from '../interfaces/auth/user.interface'
import { UserAvatar } from '../interfaces/user/user-avatar.interface'
import API, { UserAPI } from '../api/UserAPI'
import { UserData } from '../interfaces/user/user-data.interface'
import store from '../utils/Store'
import router from '../utils/Router'
import { Routes } from '../enums/routes.enum'

class UserController {
	private readonly api: UserAPI;

	constructor() {
		this.api = API;
	}

	async update(data: UserData) {
		try {
			const newUserData = await this.api.update(data);
			store.set('user.user_data', newUserData);
			router.go(Routes.Settings);
		} catch (e: any) {
			console.error(e);
			return e;
		}
	}

	async updateAvatar(data: UserAvatar) {
		try {
			await this.api.updateAvatar(data);
			// store.set('user.user_data.avatar', newUserData.avatar);
		} catch (e: any) {
			console.error(e);
			return e;
		}
	}

	async updatePassword(data: UserPassword) {
		try {
			await this.api.updatePassword(data);
			return true;
		} catch (e: any) {
			console.error(e);
			return e;
		}
	}

	async fetchUser(id: string) {
		try {
			return await this.api.read(id);
		} catch (e: any) {
			console.error(e);
			return e;
		}
	}

	async findUser(data: Record<'login', string>): Promise<User[]> {
		try {
			return await this.api.search(data);
		} catch (e: any) {
			console.error(e);
			return e;
		}
	}
}

export default new UserController();
