import { Button } from "../../components/button/button";
import { LoginBlock } from "../../components/login-block/login-block";
import {AuthLayoutLink} from "../../components/auth-layout-link/auth-layout-link";
import {AuthLayout} from "../../layouts/auth/auth-layout";
import {Input} from "../../components/input/input";
import submit from "../../utils/FormActions";

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
	href: '#',
});

const loginBlock = new LoginBlock({
	loginInput,
	passwordInput,
	submitButton,
	registrationLink,
	events: {
		submit: () => submit,
		reset: () => {
			passwordInput.setProps({value: ''});
			loginInput.setProps({value: ''});
		},
	},
});

const loginPage = new AuthLayout({
	component: loginBlock,
});
export default loginPage;
