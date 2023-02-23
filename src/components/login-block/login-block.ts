import Block from "../../utils/Block";
import template from "./login-block.hbs";
import {AuthLayoutLink} from "../auth-layout-link/auth-layout-link";
import {Button} from "../button/button";
import {Input} from "../input/input";

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
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
