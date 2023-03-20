export interface User {
	id: number;
	first_name: string;
	display_name: string;
	second_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
	[propName: string]: any;
}
