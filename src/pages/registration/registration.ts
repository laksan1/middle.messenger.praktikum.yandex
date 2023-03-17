import { Button } from '../../components/button/button';
import {AuthLayoutLink} from '../../components/auth-layout-link/auth-layout-link';
import {AuthLayout} from '../../layouts/auth/auth-layout';
import {Input} from '../../components/input/input';
import {RegistrationBlock} from '../../blocks/registration-block/registration-block';
import { Routes } from '../../enums/routes.enum'

const emailInput = new Input({
	label: 'Почта',
	type: 'email',
	placeholder: 'pochta@yandex.ru',
	name: 'email',
	validationType: 'email',
});


const loginInput = new Input({
	label: 'Логин',
	type: 'text',
	placeholder: 'Иван',
	name: 'login',
	validationType: 'login',
});

const firstNameInput = new Input({
	label: 'Имя',
	type: 'text',
	placeholder: 'Иван',
	name: 'first_name',
	validationType: 'name',
});

const secondNameInput = new Input({
	label: 'Фамилия',
	type: 'text',
	placeholder: 'Иванов',
	name: 'second_name',
	validationType: 'name',
});

const phoneInput = new Input({
	label: 'Телефон',
	type: 'tel',
	placeholder: '+7(909)9673030',
	name: 'phone',
	validationType: 'phone',
});

const passwordInput = new Input({
	label: 'Пароль',
	type: 'password',
	placeholder: 'Введите пароль',
	name: 'password',
	validationType: 'password',
});


const repeatPasswordInput = new Input({
	label: 'Пароль еще раз',
	type: 'password',
	placeholder: 'Введите пароль',
	name: 'repeat_password',
	validationType: 'password',

});


const submitButton = new Button({
	label: 'Создать профиль',
	type: 'submit',
});

const authLayoutLink = new AuthLayoutLink({
	label: 'Войти',
	href: Routes.Login,
});

const registrationBlock = new RegistrationBlock({
	emailInput,
	loginInput,
	firstNameInput,
	secondNameInput,
	phoneInput,
	passwordInput,
	repeatPasswordInput,
	submitButton,
	authLayoutLink,
});


export default class registrationPage extends AuthLayout {
	constructor() {
		super({
			component: registrationBlock,
		});
	}
}


