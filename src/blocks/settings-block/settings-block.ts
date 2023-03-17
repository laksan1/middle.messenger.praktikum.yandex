import Block from '../../utils/Block';
import template from './settings-block.hbs';
import {Button} from '../../components/button/button';
import {LogoutButton} from '../../components/logout-button/logout-button';
import {SettingsUserAvatar} from '../../components/settings-user-avatar/settings-user-avatar';
import {SettingsActionLink} from '../../components/settings-action-link/settings-action-link';
import { User } from '../../interfaces/auth/user.interface'
import { withUser } from '../../utils/Store'
import { isEqual } from '../../utils/helpers'
import { Input } from '../../components/input/input'

interface SettingsBlockProps {
	avatar: SettingsUserAvatar;
	displayName: Input;
	login: Input;
	firstName: Input;
	secondName: Input;
	email: Input;
	phone: Input;
	settingsChangeInfoButton: SettingsActionLink;
	settingsChangePasswordButton: Button;
	logoutButton: LogoutButton;
	user_data: User;
}

 class SettingsBlockWithoutUser extends Block<SettingsBlockProps> {
	constructor(props: SettingsBlockProps) {
		super('section', props);


	}

	async init() {
		if (this.props.user_data) {
			this.updateUserData();
		}
	}

	getInputs(): Array<Input | SettingsUserAvatar> {
		const inputs: Array<Input | SettingsUserAvatar>  = [];
		Object.values(this.children).forEach(child => {
			if (child instanceof Input || child instanceof SettingsUserAvatar) {
				inputs.push(child as (typeof child));
			}
		});
		return inputs;
	}

	protected render() {
		return this.compile(template, { ...this.props })
	}

	componentDidMount() {
		this.updateUserData();
	}

	protected componentDidUpdate(oldProps: SettingsBlockProps, newProps: SettingsBlockProps) {
		if (!isEqual(oldProps.user_data, newProps.user_data)) {
			this.updateUserData();
		}
		return true;
	}

	updateUserData() {
		if (!this.props.user_data) return;
		this.getInputs()
			.forEach((child: Input | SettingsUserAvatar) => {
				const dataItem = this.props.user_data[child.getName()];
				if (dataItem) {
					if (child instanceof SettingsUserAvatar) {
						child.setProps({ src: 'https://ya-praktikum.tech/api/v2/resources/' + String(dataItem) });
					} else {
						child.setProps({ value: String(dataItem) });
					}
				}
			});
	}
}

export const SettingsBlock = withUser(SettingsBlockWithoutUser as unknown as typeof Block);
