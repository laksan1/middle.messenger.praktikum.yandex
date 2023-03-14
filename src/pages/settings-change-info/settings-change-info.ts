import {SettingsUserAvatar} from '../../components/settings-user-avatar/settings-user-avatar';
import {Button} from '../../components/button/button';
import {SettingsChangeInfoBlock} from '../../blocks/settings-change-info-block/settings-change-info-block';
import {Input} from '../../components/input/input';
import {SettingsLayout} from '../../layouts/settings/settings-layout';
import {FloatButton} from '../../components/float-button/float-button';
import {SettingsSideBar} from '../../components/settings-sidebar/settings-sidebar';

const user = {
	displayName: 'Властелин',
	login: 'Иванчик',
	firstName: 'Иван',
	secondName: 'Иванов',
	src: '../img/avatar.png',
	phone: '+7(909) 967 30 30',
	email: 'potcha@yandex.ru',
};


const avatar = new SettingsUserAvatar({
	name: 'avatar',
	disabled: true,
	src: user.src,
	label: 'Поменять аватар',
	accept: 'image/*',
});

const email = new Input({
	label: 'Почта',
	type: 'email',
	placeholder: 'Введите вашу почту',
	name: 'email',
	value: user.email,
	validationType: 'email',
});

const login = new Input({
	label: 'Логин',
	type: 'text',
	placeholder: 'Введите ваш логин',
	name: 'login',
	value: user.login,
	validationType: 'login',
});

const firstName = new Input({
	label: 'Имя',
	type: 'text',
	placeholder: 'Иван',
	name: 'first_name',
	value: user.firstName,
	validationType: 'name',
});

const secondName = new Input({
	label: 'Фамилия',
	type: 'text',
	placeholder: 'Иванов',
	name: 'second_name',
	value: user.secondName,
	validationType: 'name',
});

const displayName = new Input({
	label: 'Имя в чате',
	type: 'text',
	placeholder: 'Горшок',
	name: 'display_name',
	value: user.displayName,
	validationType: 'name',
});

const phone = new Input({
	label: 'Телефон',
	type: 'tel',
	placeholder: '+7(909)9673030',
	name: 'phone',
	value: user.phone,
	validationType: 'phone',
});


const submitButton = new Button({
	label: 'Сохранить',
	type: 'submit',
});

const cancelButton = new Button({
	label: 'Отмена',
});

const settingsChangeInfoBlock = new SettingsChangeInfoBlock({
	avatar,
	login,
	firstName,
	secondName,
	phone,
	email,
	displayName,
	submitButton,
	cancelButton,
	user,
});

const floatButton = new FloatButton({
	href: '#'
})

const sidebar = new SettingsSideBar({
	floatButton
})

const settingsChangeInfoPage = new SettingsLayout({
	component: settingsChangeInfoBlock,
	sidebar
});
export default settingsChangeInfoPage;
