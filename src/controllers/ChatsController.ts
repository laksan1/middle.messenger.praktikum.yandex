import API, { ChatsAPI } from '../api/ChatsAPI'
import store from '../utils/Store'
import MessagesController from './MessagesController'
import { Chat } from '../interfaces/chat/chat.interface'
import { set } from '../utils/helpers'


class ChatsController {
	private readonly api: ChatsAPI;

	constructor() {
		this.api = API;
	}

	async create(title: string) {
		try {
			await this.api.create({ title });
			await this.loadChats();

		} catch (e: any) {
			console.error(e);
			return e;
		}
	}

	async delete(id: number) {
		if (store.getState().currentChatId === id) {
			store.set('currentChatId', null);
		}
		await this.api.delete(id);
		await this.loadChats();
	}

	selectChat(id: number) {
		console.log('selectChat id', id)
		store.set('currentChatId', id);
	}

	async loadChats(title = '') {
		try {
			const chats = await this.api.loadChats({ title });

			chats.map(async (chat) => {
				const token = await this.getToken(chat.id);

				await MessagesController.connect(chat.id, token);
			});
			console.log('ChatsController chats',  chats)
			store.set('chats', chats);
		} catch (e: any) {
			console.error(e);
		}
	}

	getChatData(id: number) {
		console.log('id', id)
		console.log('store.getState()', store.getState())
		const chatData = (store.getState().chats as Chat[]).find((chat) => chat.id === id);
		if (!chatData) {
			throw Error('Chat not found in the list of your chats');
		}

		return chatData;
	}

	updateChatData(id: number, path: string, value: unknown) {
		const chatData = (store.getState().chats as Chat[]).find((chat) => chat.id === id);
		if (chatData) {
			set(chatData, path, value);
		} else {
			throw Error('Chat not found in the list of your chats');
		}
	}

	getChatUsers(id: number) {
		try {
			return this.api.getChatUsers(id);
		} catch (e: any) {
			return [];
		}
	}

	deleteUsersFromChat(data: {users: number[], chatId: number}) {
		return this.api.deleteUsersFromChat(data);
	}

	addUsersToChat(data: {users: number[], chatId: number}) {
		return this.api.addUsersToChat(data);
	}

	getToken(id: number) {
		return this.api.getToken(id);
	}

}

export default new ChatsController();
