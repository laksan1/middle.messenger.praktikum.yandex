import { User } from '../auth/user.interface';

export interface Chat {
	id: number;
	avatar: string;
	title: string;
	created_by: number;
	unread_count: number;
	last_message: LastMessage;
}

export interface LastMessage {
	user: Partial<User>;
	time: string;
	content: string;
}
