import { Button } from '../../components/button/button';
import Block from '../../utils/Block';
import template from './settings-change-password-block.hbs';
import { Input } from '../../components/input/input';
import checkForm from '../../utils/FormActions';
import { closeModalWindow } from '../../utils/ModalWindow';
import UserController from '../../controllers/UserController';
import { UserPassword } from '../../interfaces/user/user-password.interface';

type SettingsChangePasswordBlockProps = {
	oldPasswordInput: Input;
	newPasswordInput: Input;
	submitButton: Button;
	cancelButton: Button;
	events?: Record<string, (e?: Event) => void>;
};

export class SettingsChangePasswordBlock extends Block<SettingsChangePasswordBlockProps> {
	constructor(props: SettingsChangePasswordBlockProps) {
		super('form', props);
		this.setProps({
			events: {
				...this.props.events,
				submit: this.sendForm.bind(this),
			},
		});
	}

	async sendForm(e?: Event) {
		if (!e) {
			return;
		}
		const isFormReady = checkForm(e);
		console.log('SettingsChangePasswordBlock isFormReady', isFormReady);
		if (isFormReady) {
			const oldPassword = (this.children.oldPasswordInput as Input).getValue();
			const newPassword = (this.children.newPasswordInput as Input).getValue();

			console.log('oldPassword', oldPassword);
			console.log('newPassword', newPassword);

			if (!oldPassword || !newPassword) {
				console.log('One of passwords is Empty');
				return;
			}

			if (oldPassword !== newPassword) {
				console.log('Passwords are not the same');
				return;
			}

			const data: UserPassword = {
				oldPassword,
				newPassword,
			};

			const response = await UserController.updatePassword(data);

			if (response?.reason) {
				(this.children.oldPasswordInput as Input).setError(response.reason);
				return;
			}
			closeModalWindow();
		}
	}

	protected render() {
		return this.compile(template, { ...this.props });
	}
}
