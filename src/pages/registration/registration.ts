import { Button } from "../../components/button/button";
import {AuthLayoutLink} from "../../components/auth-layout-link/auth-layout-link";
import {AuthLayout} from "../../layouts/auth/auth-layout";
import {Input} from "../../components/input/input";
import {RegistrationBlock} from "../../blocks/registration-block/registration-block";
import submit from "../../utils/FormActions";

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
	placeholder: 'ivanivanov',
	name: 'first_name',
	validationType: 'name',
});

const lastNameInput = new Input({
	label: 'Фамилия',
	type: 'text',
	placeholder: 'Иванов',
	name: 'last_name',
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
	href: '../login/login.hbs',
});

const registrationBlock = new RegistrationBlock({
	emailInput,
	loginInput,
	firstNameInput,
	lastNameInput,
	phoneInput,
	passwordInput,
	repeatPasswordInput,
	submitButton,
	authLayoutLink,
	events: {
		submit: () => submit,
		reset: () => {
			loginInput.setProps({ value: '' });
			firstNameInput.setProps({ value: '' });
			lastNameInput.setProps({ value: '' });
			emailInput.setProps({ value: '' });
			phoneInput.setProps({ value: '' });
			passwordInput.setProps({ value: '' });
			repeatPasswordInput.setProps({ value: '' });
		},
	},
});



const registrationPage = new AuthLayout({
	component: registrationBlock,
});
export default registrationPage;
