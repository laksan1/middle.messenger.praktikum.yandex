import { User } from '../auth/user.interface'

export interface ChatMember extends User {
	role: string;
	isMember?: boolean;
}
