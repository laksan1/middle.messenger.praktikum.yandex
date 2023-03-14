import BaseAPI from '../utils/BaseAPI'
import { Chat } from '../interfaces/chat/chat.interface'
import { ChatMember } from '../interfaces/chat/chat-member.interface'

export class ChatsAPI extends BaseAPI {
	private static __instance: ChatsAPI;

	constructor() {
		super('/chats');

		if (ChatsAPI.__instance) {
			return ChatsAPI.__instance;
		}

		ChatsAPI.__instance = this;
	}

	create(data: Record<'title', string>) {
		return this.http.post('/', { data });
	}

	loadChats(data: Record<'title', string>): Promise<Chat[]> {
		return this.http.get('/', { data });
	}

	delete(identifier: number) {
		return this.http.delete('/', { data: { chatId: identifier } });
	}

	getChatUsers(identifier: number): Promise<ChatMember[]> {
		return this.http.get(`/${identifier}/users`);
	}

	addUsersToChat(data: {users: number[], chatId: number}) {
		return this.http.put('/users', { data });
	}

	deleteUsersFromChat(data: {users: number[], chatId: number}) {
		return this.http.delete('/users', { data });
	}

	async getToken(identifier: number): Promise<string> {
		const response = await this.http.post<{ token: string }>(`/token/${identifier}`);

		return response.token;
	}

	read = undefined;

	update = undefined;
}

export default new ChatsAPI();
