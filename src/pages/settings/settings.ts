import {SettingsUserAvatar} from '../../components/settings-user-avatar/settings-user-avatar';
import {SettingsUserItem} from '../../components/settings-user-item/settings-user-item';
import {LogoutButton} from '../../components/logout-button/logout-button';
import {SettingsActionLink} from '../../components/settings-action-link/settings-action-link';
import {Button} from '../../components/button/button';
import {SettingsBlock} from '../../blocks/settings-block/settings-block';
import {SettingsLayout} from '../../layouts/settings/settings-layout';
import {SettingsSideBar} from '../../components/settings-sidebar/settings-sidebar';
import {FloatButton} from '../../components/float-button/float-button';
import settingsChangePasswordModal from '../../modal-windows/settings-change-password/settings-change-password';
import {openModalWindow} from '../../utils/ModalWindow';

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

const email = new SettingsUserItem({
	label: 'Почта',
	value: user.email,
});

const login = new SettingsUserItem({
	label: 'Логин',
	value: user.login,
});


const firstName = new SettingsUserItem({
	label: 'Имя',
	value: user.firstName,
});


const secondName = new SettingsUserItem({
	label: 'Фамилия',
	value: user.secondName,
});

const displayName = new SettingsUserItem({
	label: 'Имя в чате',
	value: user.displayName,
});

const phone = new SettingsUserItem({
	label: 'Имя в чате',
	value: user.phone,
});

const settingsChangeInfoButton = new SettingsActionLink({
	label: 'Изменить данные',
	href: 'settingsChangeInfoPage',
});

const modals = {
	settingsChangePasswordModal,
};


const settingsChangePasswordButton = new Button({
	label: 'Изменить пароль',
	events: {
		click: () => openModalWindow(modals.settingsChangePasswordModal),
	},
});

const logoutButton = new LogoutButton({
	label: 'Выйти',
	href: '#',
});

const floatButton =  new FloatButton({
	href: '#',
})

const sidebar = new SettingsSideBar({
	floatButton
})


const settingsBlock = new SettingsBlock({
	user,
	avatar,
	email,
	login,
	firstName,
	secondName,
	displayName,
	phone,
	settingsChangeInfoButton,
	settingsChangePasswordButton,
	logoutButton,
});


const settingsPage = new SettingsLayout({
	sidebar,
	component: settingsBlock,
});

export default settingsPage;
