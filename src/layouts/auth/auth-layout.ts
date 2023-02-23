import Block from '../../utils/Block';
import template from './auth-layout.hbs';
import styles from './auth-layout.module.scss';
import {LoginBlock} from "../../components/login-block/login-block";
import {RegistrationBlock} from "../../components/registration-block/registration-block";

type AuthLayoutProps = {
	component: LoginBlock | RegistrationBlock
}

export class AuthLayout extends Block<AuthLayoutProps> {
	constructor(props: AuthLayoutProps) {
		super('div', props);
	}

	protected render(): DocumentFragment {
		return super.compile(template, {...this.props, styles});
	}
}
