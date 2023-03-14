import Block from '../../utils/Block';
import template from './settings-block.hbs';
import {Button} from '../../components/button/button';
import {LogoutButton} from '../../components/logout-button/logout-button';
import {SettingsUserAvatar} from '../../components/settings-user-avatar/settings-user-avatar';
import {SettingsUserItem} from '../../components/settings-user-item/settings-user-item';
import {SettingsActionLink} from '../../components/settings-action-link/settings-action-link';


interface IUser {
	login: string;
	firstName: string;
	secondName: string;
	src: string;
	phone: string;
	email: string;
	displayName: string;
}

type SettingsBlockProps = {
	avatar: SettingsUserAvatar;
	displayName: SettingsUserItem;
	login: SettingsUserItem;
	firstName: SettingsUserItem;
	secondName: SettingsUserItem;
	email: SettingsUserItem;
	phone: SettingsUserItem;
	settingsChangeInfoButton: SettingsActionLink;
	settingsChangePasswordButton: Button;
	logoutButton: LogoutButton;
	user: IUser;
};

export class SettingsBlock extends Block<SettingsBlockProps> {
	constructor(props: SettingsBlockProps) {
		super('section', props);
	}

	protected render() {
		return this.compile(template, { ...this.props })
	}
}
