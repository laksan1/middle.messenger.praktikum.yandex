import { Button } from '../../components/button/button';
import { LoginBlock } from '../../blocks/login-block/login-block';
import {AuthLayoutLink} from '../../components/auth-layout-link/auth-layout-link';
import {AuthLayout} from '../../layouts/auth/auth-layout';
import {Input} from '../../components/input/input';
import { Routes } from '../../enums/routes.enum'

const loginInput = new Input({
	label: 'Логин',
	type: 'text',
	placeholder: 'Введите ваш логин',
	name: 'login',
	validationType: 'login',
});

const passwordInput = new Input({
	label: 'Пароль',
	type: 'password',
	placeholder: 'Введите пароль',
	name: 'password',
	validationType: 'password',
});

const submitButton = new Button({
	label: 'Войти',
	type: 'submit',
});

const registrationLink = new AuthLayoutLink({
	label: 'Регистрация',
	href: Routes.Register,
});

const loginBlock = new LoginBlock({
	loginInput,
	passwordInput,
	submitButton,
	registrationLink,
});

export default class loginPage extends AuthLayout {
	constructor() {
		super({
			component: loginBlock,
		});
	}
}
