import Block from '../../utils/Block';
import template from './settings-layout.hbs';
import styles from './settings-layout.module.scss';
import {SettingsSideBar} from "../../components/settings-sidebar/settings-sidebar";
import {SettingsBlock} from "../../blocks/settings-block/settings-block";
import {SettingsChangePasswordBlock} from "../../blocks/settings-change-password-block/settings-change-password-block";
import {SettingsChangeInfoBlock} from "../../blocks/settings-change-info-block/settings-change-info-block";


type SettingsLayoutProps = {
	component: SettingsBlock | SettingsChangePasswordBlock | SettingsChangeInfoBlock;
	 sidebar:  SettingsSideBar
}

export class SettingsLayout extends Block<SettingsLayoutProps> {
	constructor(props: SettingsLayoutProps) {
		super('div', props);
		this.element!.classList.add('settings-container');
	}

	protected render(): DocumentFragment {
		return super.compile(template, {...this.props, styles});
	}
}
