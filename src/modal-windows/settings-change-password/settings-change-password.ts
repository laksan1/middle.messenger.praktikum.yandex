import {Input} from "../../components/input/input";
import {Button} from "../../components/button/button";
import {SettingsChangePasswordBlock} from "../../components/settings-change-password-block/settings-change-password-block";
import submit from "../../utils/FormActions";
import {SettingsUserAvatar} from "../../components/settings-user-avatar/settings-user-avatar";
import {ModalWindowLayout} from "../../layouts/modal-window/modal-window-layout";
import {closeModalWindow} from "../../utils/ModalWindow";

const avatar = new SettingsUserAvatar({
	name: 'avatar',
	disabled: true,
	src: '../../../assets/img/avatar.png',
	label: 'Поменять аватар',
	accept: 'image/*',

});

const oldPasswordInput = new Input({
	type: 'password',
	label: 'Старый пароль',
	placeholder: 'Введите старый пароль',
	name: 'oldPassword',
	validationType: 'password',
});

const newPasswordInput  = new Input({
	type: 'password',
	label: 'Новый пароль',
	placeholder: 'Придумайте новый пароль',
	name: 'newPassword',
	validationType: 'password',
});

const submitButton  = new Button ({
	label: 'Сохранить',
	type: 'submit',
});

const cancelButton = new Button ({
	label: 'Отмена',
	events: {
		click: () => closeModalWindow(),
	},
});

const  settingsChangePasswordBlock = new SettingsChangePasswordBlock({
	avatar,
	oldPasswordInput,
	newPasswordInput,
	submitButton,
	cancelButton,
	events: {
		submit: () => submit,
	},

})

const settingsChangePasswordModal = new ModalWindowLayout({
	modal: settingsChangePasswordBlock
})
export default settingsChangePasswordModal;
