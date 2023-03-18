import Block from '../../utils/Block'
import template from './dots-menu.hbs'
import { PropsWithRouter } from '../../hocs/withRouter'
import { withUserAndMessages } from '../../utils/Store'
import { User } from '../../interfaces/auth/user.interface'
import { Chat } from '../../interfaces/chat/chat.interface'
import ChatsController from '../../controllers/ChatsController'

interface DotsMenuProps extends PropsWithRouter {
	chatId: number;
	label: string;
	user_data: User;
	events?: Record<string, (e?: Event) => void>;
}

const ownerActionsList = [
	{
		action: 'viewUsers',
		name: 'View participants',
	},
	{
		action: 'removeChat',
		name: 'Delete chat',
	}
];

const baseActionsList = [
	{
		action: 'viewUsers',
		name: 'View participants',
	}
];

class DotsMenuWithout extends Block<DotsMenuProps> {
	actionsList: Record<string, string>[] | undefined;
	chatData: Chat | undefined;

	constructor(props: DotsMenuProps) {
		super('div', props)
		this.element!.classList.add('actions')
	}

	init() {
		this.chatData = ChatsController.getChatData(this.props.chatId);
		if (this.props.user_data.id === this.chatData.created_by) {
			this.actionsList = ownerActionsList
		} else {
			this.actionsList = baseActionsList
		}
	}


	protected render() {
		return this.compile(template, { ...this.props, userId: this.props.user_data?.id, actionsList: this.actionsList, chatData: this.chatData });
	}
}

export const DotsMenu = withUserAndMessages(DotsMenuWithout as unknown as typeof Block)
