import Block from '../../utils/Block';
import template from './login-block.hbs';
import {AuthLayoutLink} from '../../components/auth-layout-link/auth-layout-link';
import {Button} from '../../components/button/button';
import {Input} from '../../components/input/input';
import AuthController from '../../controllers/AuthController'
import checkForm from '../../utils/FormActions'

type LoginBlockProps = {
	loginInput: Input;
	passwordInput: Input;
	submitButton: Button;
	registrationLink: AuthLayoutLink;
	events?: Record<string, (e?: Event) => void>;
}

export class LoginBlock extends Block<LoginBlockProps> {
	constructor(props: LoginBlockProps) {
		super('div', props);
		this.setProps({
			events: {
				...this.props.events,
				submit:  this.sendForm.bind(this)
			}
		});
	}

	async sendForm(e: Event) {
		e.preventDefault();
		//AuthController.logout();
		const isFormReady = checkForm(e);
		if (isFormReady) {
			const values = Object
				.values(this.children)
				.filter(child => child instanceof Input)
				.map((child) => ([(child as Input).getName(), (child as Input).getValue()]));

			const data =  Object.fromEntries(values); // SigninStub
			const response = await AuthController.signin(data);

			if (response?.reason) {
				Object.values(this.children)
					.filter(child => child instanceof Input)
					.forEach((child) => {
						if ((child as Input).getName() === 'login') {
							(child as Input).setError(response.reason);
						}
					});
			} else {
				Object.values(this.children)
					.filter(child => child instanceof Input)
					.forEach((child) => ((child as Input).setProps({ value: ''})));
			}
		}
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
