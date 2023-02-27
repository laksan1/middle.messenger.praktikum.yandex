import Block from "../../utils/Block";
import template from "./registration-block.hbs";
import {AuthLayoutLink} from "../../components/auth-layout-link/auth-layout-link";
import {Button} from "../../components/button/button";
import {Input} from "../../components/input/input";

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
	events?: Record<string, (e?: Event) => void>;
}

export class RegistrationBlock extends Block<RegistrationBlockProps> {
	constructor(props: RegistrationBlockProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
