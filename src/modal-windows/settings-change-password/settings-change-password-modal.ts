import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { SettingsChangePasswordBlock } from '../../blocks/settings-change-password-block/settings-change-password-block';
import { ModalWindowLayout } from '../../layouts/modal-window/modal-window-layout';
import { closeModalWindow } from '../../utils/ModalWindow';

const oldPasswordInput = new Input({
	type: 'password',
	label: 'Старый пароль',
	placeholder: 'Введите старый пароль',
	name: 'oldPassword',
	validationType: 'password',
});

const newPasswordInput = new Input({
	type: 'password',
	label: 'Новый пароль',
	placeholder: 'Придумайте новый пароль',
	name: 'newPassword',
	validationType: 'password',
});

const submitButton = new Button({
	label: 'Сохранить',
	type: 'submit',
});

const cancelButton = new Button({
	label: 'Отмена',
	events: {
		click: () => closeModalWindow(),
	},
});

const settingsChangePasswordBlock = new SettingsChangePasswordBlock({
	oldPasswordInput,
	newPasswordInput,
	submitButton,
	cancelButton,
});

const settingsChangePasswordModal = new ModalWindowLayout({
	modal: settingsChangePasswordBlock,
});
export default settingsChangePasswordModal;
