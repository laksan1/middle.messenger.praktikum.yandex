import { SettingsUserAvatar } from '../../components/settings-user-avatar/settings-user-avatar';
import { LogoutButton } from '../../components/logout-button/logout-button';
import { SettingsActionLink } from '../../components/settings-action-link/settings-action-link';
import { Button } from '../../components/button/button';
import { SettingsBlock } from '../../blocks/settings-block/settings-block';
import { SettingsLayout } from '../../layouts/settings/settings-layout';
import { SettingsSideBar } from '../../components/settings-sidebar/settings-sidebar';
import { FloatButton } from '../../components/float-button/float-button';
import settingsChangePasswordModal from '../../modal-windows/settings-change-password/settings-change-password-modal';
import { openModalWindow } from '../../utils/ModalWindow';
import AuthController from '../../controllers/AuthController';
import { Routes } from '../../enums/routes.enum';
import { Input } from '../../components/input/input';
import { UserFields } from '../../enums/userFields.enum';

const avatar = new SettingsUserAvatar({
	name: 'avatar',
	disabled: true,
	src: 'img/avatar.png',
	imageAlt: 'user photo',
	accept: 'image/*',
});

const email = new Input({
	label: 'Почта',
	type: 'email',
	placeholder: 'pochta@yandex.ru',
	name: UserFields.email,
	validationType: 'email',
	disabled: true,
});

const login = new Input({
	label: 'Логин',
	type: 'text',
	placeholder: 'Иван',
	name: UserFields.login,
	validationType: 'login',
	disabled: true,
});

const firstName = new Input({
	label: 'Имя',
	type: 'text',
	placeholder: 'Иван',
	name: UserFields.first_name,
	validationType: 'name',
	disabled: true,
});

const secondName = new Input({
	label: 'Фамилия',
	type: 'text',
	placeholder: 'Иванов',
	name: UserFields.second_name,
	validationType: 'name',
	disabled: true,
});

const displayName = new Input({
	label: 'Имя в чате',
	type: 'text',
	placeholder: '...',
	name: UserFields.display_name,
	validationType: 'name',
	disabled: true,
});

const phone = new Input({
	label: 'Телефон',
	type: 'tel',
	placeholder: 'телефон',
	name: UserFields.phone,
	validationType: 'phone',
	disabled: true,
});

const settingsChangeInfoButton = new SettingsActionLink({
	label: 'Изменить данные',
	href: Routes.SettingsEdit,
});

const settingsChangePasswordButton = new Button({
	label: 'Изменить пароль',
	events: {
		click: () => openModalWindow(settingsChangePasswordModal),
	},
});

const logoutButton = new LogoutButton({
	label: 'Выйти',
	href: '#',
	events: {
		click: async (e) => {
			e!.preventDefault();
			await AuthController.logout();
		},
	},
});

const floatButton = new FloatButton({
	href: Routes.Messenger,
});

const sidebar = new SettingsSideBar({
	floatButton,
});

const settingsBlock = new SettingsBlock({
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

export default class settingsPage extends SettingsLayout {
	constructor() {
		super({
			sidebar,
			component: settingsBlock,
		});
	}

	componentDidMount() {
		this.children.component.dispatchComponentDidMount();
	}
}
