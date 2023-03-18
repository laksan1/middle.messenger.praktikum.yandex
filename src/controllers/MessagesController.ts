import WSTransport, { WSTransportEvents } from '../utils/WSTransport'
import store from '../utils/Store'
import { Message } from '../interfaces/chat/message.interface'

class MessagesController {
	private sockets: Map<number, WSTransport> = new Map();

	async connect(id: number, token: string) {
		if (this.sockets.has(id)) {
			return;
		}

		const userId = store.getState().user.user_data?.id;

		const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

		this.sockets.set(id, wsTransport);

		await wsTransport.connect();

		this.subscribe(wsTransport, id);
		this.fetchOldMessages(id);
	}

	sendMessage(id: number, message: string) {
		const socket = this.sockets.get(id);
		console.log('socket', socket)
		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		console.log('sendMessage message', message)

		socket.send({
			type: 'message',
			content: message,
		});
	}

	fetchOldMessages(id: number) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({ type: 'get old', content: '0' });
	}

	closeAll() {
		Array.from(this.sockets.values()).forEach(socket => socket.close());
	}

	private onMessage(id: number, messages: Message | Message[]) {
		let messagesToAdd: Message[] = [];

		if (Array.isArray(messages)) {
			messagesToAdd = messages.reverse();
		} else {
			messagesToAdd.push(messages);
		}

		messagesToAdd.forEach((message) => {
			const hour = String(new Date(message.time).getHours()).padStart(2, '0'),
				minutes = String(new Date(message.time).getMinutes()).padStart(2, '0');
			message.human_time = `${hour}:${minutes}`;
		});

		const currentMessages = (store.getState().messages || {})[id] || [];

		messagesToAdd = [...currentMessages, ...messagesToAdd];

		store.set(`messages.${id}`, messagesToAdd);
	}

	private onClose(id: number) {
		this.sockets.delete(id);
	}

	private subscribe(transport: WSTransport, id: number) {
		transport.on(WSTransportEvents.Message, (message) => this.onMessage(id, message));
		transport.on(WSTransportEvents.Close, () => this.onClose(id));
	}
}

export default  new MessagesController();

