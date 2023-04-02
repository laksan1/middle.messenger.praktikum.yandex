import Block from '../../utils/Block';
import template from './registration-block.hbs';
import { AuthLayoutLink } from '../../components/auth-layout-link/auth-layout-link';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import checkForm from '../../utils/FormActions';
import AuthController from '../../controllers/AuthController';

type RegistrationBlockProps = {
	emailInput: Input;
	loginInput: Input;
	firstNameInput: Input;
	secondNameInput: Input;
	phoneInput: Input;
	passwordInput: Input;
	repeatPasswordInput: Input;
	submitButton: Button;
	authLayoutLink: AuthLayoutLink;
	events?: Record<string, (e?: Event) => void | Promise<void>>;
};

export class RegistrationBlock extends Block<RegistrationBlockProps> {
	constructor(props: RegistrationBlockProps) {
		super('div', props);
		this.setProps({
			events: {
				...this.props.events,
				submit: this.sendForm.bind(this),
				reset: this.resetForm.bind(this),
			},
		});
	}

	async sendForm(e?: Event) {
		if (!e) {
			return;
		}
		e.preventDefault();
		const isFormReady = checkForm(e);
		if (isFormReady) {
			const values = Object.values(this.children)
				.filter((child) => child instanceof Input)
				.map((child) => [(child as Input).getName(), (child as Input).getValue()]);

			const data = Object.fromEntries(values); // SignupStub;
			await AuthController.signup(data);
		}
	}

	async resetForm() {
		Object.values(this.children)
			.filter((child) => child instanceof Input)
			.forEach((child) => (child as Input).setProps({ value: '' }));
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
