import { Chat } from '../interfaces/chat/chat.interface';
import { ChatMember } from '../interfaces/chat/chat-member.interface';
import { BaseAPI } from '../utils/BaseAPI';

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
		return this.http.post('/', data);
	}

	async getToken(id: number): Promise<string> {
		const response = await this.http.post<{ token: string }>(`/token/${id}`);

		return response.token;
	}

	loadChats(data: Record<'title', string>): Promise<Chat[]> {
		return this.http.get('/', data);
	}

	delete(id: number) {
		return this.http.delete('/', { chatId: id });
	}

	getChatUsers(id: number): Promise<ChatMember[]> {
		return this.http.get(`/${id}/users`);
	}

	addUsersToChat(data: { users: number[]; chatId: number }) {
		return this.http.put('/users', { data });
	}

	deleteUsersFromChat(data: { users: number[]; chatId: number }) {
		return this.http.delete('/users', { data });
	}

	read = undefined;

	update = undefined;
}

export default new ChatsAPI();
