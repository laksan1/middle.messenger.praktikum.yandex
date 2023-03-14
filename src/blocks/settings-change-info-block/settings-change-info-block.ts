import {Button} from '../../components/button/button';
import Block from '../../utils/Block';
import template from './settings-change-info-block.hbs';
import {Input} from '../../components/input/input';
import {SettingsUserAvatar} from '../../components/settings-user-avatar/settings-user-avatar';

interface IUser {
	login: string;
	firstName: string;
	secondName: string;
	src: string;
	phone: string;
	email: string;
	displayName: string;
}

type SettingsChangeInfoBlockProps = {
	avatar: SettingsUserAvatar;
	displayName: Input;
	login: Input;
	firstName: Input;
	secondName: Input;
	email: Input;
	phone: Input;
	submitButton: Button;
	cancelButton: Button;
	user: IUser
	events?: Record<string, (e?: Event) => void>;
};

export class SettingsChangeInfoBlock extends Block<SettingsChangeInfoBlockProps> {
	constructor(props: SettingsChangeInfoBlockProps) {
		super('form', props);
	}


	protected render() {
		return this.compile(template, {...this.props})
	}
}
