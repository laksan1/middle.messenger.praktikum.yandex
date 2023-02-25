import template from "../../auth-layout-link/auth-layout-link.hbs";
import {SearchInput} from "../../search-input/search-input";
import Block from "../../../utils/Block";

type ChatSidebarProps = {
	chatsData: object[];
	searchInput: SearchInput;
}
export class ChatSidebar extends Block<ChatSidebarProps> {
	constructor(props: ChatSidebarProps) {
		super('section', props);
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
