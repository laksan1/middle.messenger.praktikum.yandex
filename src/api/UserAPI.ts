import BaseAPI from '../utils/BaseAPI'
import { User } from '../interfaces/auth/user.interface'
import { UserData } from '../interfaces/user/user-data.interface'
import { UserAvatar } from '../interfaces/user/user-avatar.interface'
import { UserPassword } from '../interfaces/user/user-password.interface'

export class UserAPI extends BaseAPI {
	private static __instance: UserAPI;

	constructor() {
		super('/user');

		if (UserAPI.__instance) {
			return UserAPI.__instance;
		}

		UserAPI.__instance = this;
	}

	update(data: UserData): Promise<User> {
		return this.http.put<User>('/profile',  data );
	}

	read(identifier: string): Promise<User> {
		return this.http.get<User>(`/${identifier}`);
	}

	search(data: Record<'login', string>): Promise<User[]> {
		return this.http.post('/search', data);
	}

	updateAvatar(data: UserAvatar): Promise<User> {
		const formData = new FormData();
		const file = data.avatar;

		if (file instanceof Blob) {
			console.log('Blob', file)
			formData.append('avatar', file, file.name);
		}else {
			formData.append('avatar', JSON.stringify(file));
		}
		return this.http.put<User>('/profile/avatar', formData );
	}

	updatePassword(data: UserPassword): Promise<User> {
		return this.http.put<User>('/password',  data);
	}

	create = undefined;

	delete = undefined;
}

export default new UserAPI();
