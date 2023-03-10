import {Button} from "../../components/button/button";
import Block from "../../utils/Block";
import template from "./settings-change-password-block.hbs";
import {Input} from "../../components/input/input";
import {SettingsUserAvatar} from "../../components/settings-user-avatar/settings-user-avatar";

type SettingsChangePasswordBlockProps = {
	avatar: SettingsUserAvatar;
	oldPasswordInput: Input;
	newPasswordInput: Input;
	submitButton: Button;
	cancelButton: Button;
	events?: Record<string, (e?: Event) => void>;
};

export class SettingsChangePasswordBlock extends Block<SettingsChangePasswordBlockProps> {
	constructor(props: SettingsChangePasswordBlockProps) {
		super('form', props);
		this.element!.addEventListener('focusin', this.validatePasswords.bind(this));
	}

	validatePasswords() {
		console.log('this.element', this.element!);

		//this.setProps({error: 'Пароли не совпадают', value: ''});

	}

	protected render() {
		return this.compile(template, {...this.props})
	}
}
