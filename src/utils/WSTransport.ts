import EventBus from './EventBus';

export enum WSTransportEvents {
	Connected = 'connected',
	Error = 'error',
	Message = 'message',
	Close = 'close',
}

export default class WSTransport extends EventBus<any> {
	private socket: WebSocket | null = null;
	private pingInterval: ReturnType<typeof setTimeout> | undefined;

	constructor(private url: string) {
		super();
	}

	public send(data: unknown) {
		if (!this.socket) {
			throw new Error('Socket is not connected');
		}

		this.socket.send(JSON.stringify(data));
	}

	public connect(): Promise<void> {
		this.socket = new WebSocket(this.url);

		this.subscribe(this.socket);

		this.setupPing();

		return new Promise((resolve) => {
			this.on(WSTransportEvents.Connected, () => {
				resolve();
			});
		});
	}

	public close() {
		this.socket?.close();
	}

	private setupPing() {
		this.pingInterval = setInterval(() => {
			this.send({ type: 'ping' });
		}, 5000);

		this.on(WSTransportEvents.Close, () => {
			clearInterval(this.pingInterval);

			this.pingInterval?.refresh();
		});
	}

	private subscribe(socket: WebSocket) {
		socket.addEventListener('open', () => {
			this.emit(WSTransportEvents.Connected);
		});

		socket.addEventListener('close', (e) => {
			if (e.wasClean) {
				console.warn(`[close] Соединение закрыто чисто, код: ${e.code} причина: ${e.reason}`);
				this.emit(WSTransportEvents.Close);
			} else {
				console.error(`[close] Соединение прервано, код=${e.code}`);
				setTimeout(() => this.connect(), 5000);
			}
		});

		socket.addEventListener('error', (e) => {
			this.emit(WSTransportEvents.Error, e);
		});

		socket.addEventListener('message', (message) => {
			const data = JSON.parse(message.data);

			if (data.type && data.type === 'pong') {
				return;
			}

			this.emit(WSTransportEvents.Message, data);
		});
	}
}
