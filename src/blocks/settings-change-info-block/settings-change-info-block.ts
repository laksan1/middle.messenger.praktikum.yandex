import {Button} from '../../components/button/button';
import Block from '../../utils/Block';
import template from './settings-change-info-block.hbs';
import {Input} from '../../components/input/input';
import {SettingsUserAvatar} from '../../components/settings-user-avatar/settings-user-avatar';
import { withUser } from '../../utils/Store';
import { User } from '../../interfaces/auth/user.interface';
import { isEqual } from '../../utils/helpers'
import checkForm from '../../utils/FormActions'
import UserController from '../../controllers/UserController'
import { UserData } from '../../interfaces/user/user-data.interface'

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
	user_data: User
	events?: Record<string, (e?: Event) => void>;
};

 class SettingsChangeInfoBlockWithoutUser extends Block<SettingsChangeInfoBlockProps> {
	constructor(props: SettingsChangeInfoBlockProps) {
		super('div', props);
		this.element!.addEventListener('submit', this.sendForm.bind(this));
	}

	async init() {
		console.log('SettingsChangeInfoBlock this.props.user_data', this.props.user_data)
		if (this.props.user_data) {
			this.updateUserData();
		}
	}

	async sendForm(e: Event) {
		console.log('SettingsChangeInfoBlock sendForm')
		e.preventDefault();

		const isFormReady = checkForm(e);
		console.log('SettingsChangeInfoBlock isFormReady 222', isFormReady)
		if (isFormReady) {

			const avatarValue = this.getPhotoInput().getValue();
			if (avatarValue) {
				await UserController.updateAvatar({ avatar: avatarValue });
			}

			const fieldsValues = this.getInputs()
				.map((child) => ([child.getName(), child.getValue()]));

			const data: UserData = Object.fromEntries(fieldsValues);
			const response = await UserController.update(data);

			if (response?.reason) {
				this.getInputs()
					.forEach((child) => {
						if ((child).getName() === 'display_name') {
							(child).setError(response.reason);
						}
					});
			}
		}
	}


	updateUserData() {
		if (!this.props.user_data) return;
		[...this.getInputs(), this.getPhotoInput()]
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
	getInputs(): Array<Input> {
		return Object.values(this.children).filter(child => child instanceof Input) as Array<Input>;
	}

	getPhotoInput(): SettingsUserAvatar {
		return Object.values(this.children).find((child) => child instanceof SettingsUserAvatar) as SettingsUserAvatar;
	}

	protected componentDidUpdate(oldProps: SettingsChangeInfoBlockProps, newProps: SettingsChangeInfoBlockProps) {
		if (!isEqual(oldProps.user_data, newProps.user_data)) {
			this.updateUserData();
		}
		return true
	}

	protected render() {
		return this.compile(template, {...this.props})
	}
}

export const SettingsChangeInfoBlock = withUser(SettingsChangeInfoBlockWithoutUser as unknown as typeof Block);
