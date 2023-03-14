import { User } from '../interfaces/auth/user.interface';
import { Chat } from '../interfaces/chat/chat.interface';
import { Message } from '../interfaces/chat/message.interface';
import EventBus from './EventBus';
import { set } from './helpers';
import { withStore } from '../hocs/withStore';

export enum StoreEvents{
	Updated = 'updated'
}

type StoreEventsType = {
	updated: [IStore];
}

interface IStore {
	user: {
		user_data: User | null,
	},
	chats: Chat[],
	currentChatId: number | null,
	messages: {
		[propName: string]: Message[];
	},
	error: string;
}
class Store extends EventBus<StoreEventsType> {
	private static instance: Store;

	private state: IStore = {
		user: {
			user_data: null,
		},
		chats: [],
		currentChatId: null,
		messages: {},
		error: ''
	};

	constructor() {
		super();

		if (Store.instance) {
			return Store.instance;
		}

		Store.instance = this;
	}

	public set(keyPath: string, data: unknown) {
		set(this.state, keyPath, data);

		this.emit(StoreEvents.Updated, this.getState());
	}

	public getState() {
		return this.state;
	}
}
export default new Store();

const withUser = withStore((state) => {
	return {
		user_data: state.user.user_data,
	}
});

const withChats = withStore((state) => {
	return {
		chats: state.chats,
		currentChatId: state.currentChatId,
	}
});

export { withUser, withChats };
