import Block from "../../utils/Block";
import template from "../login-block/login-block.hbs";
import {FloatButton} from "../float-button/float-button";

type SettingsSideBarProps = {
	floatButton: FloatButton
	events?: Record<string, (e?: Event) => void>;
}

export class SettingsSideBar extends Block<SettingsSideBarProps> {
	constructor(props: SettingsSideBarProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
