import { SearchInput } from '../../components/search-input/search-input';
import { Button } from '../../components/button/button';
import { User } from '../../interfaces/auth/user.interface';
import { ChatMember } from '../../interfaces/chat/chat-member.interface';
import Block from '../../utils/Block';
import ChatsController from '../../controllers/ChatsController';
import { Chat } from '../../interfaces/chat/chat.interface';
import UserController from '../../controllers/UserController';
import template from './chat-show-users-block.hbs';
import { withStore } from '../../hocs/withStore'

interface ChatShowUsersBlockProps {
	searchInput: SearchInput;
	cancelButton: Button;
	currentChatId: number;
	user_data: User;
	isSearching: boolean;
	currentChatMembers: ChatMember[];
	users: ChatMember[] | User[];
}

class ChatShowUsersBlockBase extends Block<ChatShowUsersBlockProps> {
	isAdmin = false;
	chatData: Chat | undefined = undefined;
	searchBouncer: NodeJS.Timeout | number = 0;

	constructor(props: ChatShowUsersBlockProps) {
		super('section', props);

		this.element!.classList.add('form');

		this.setProps({
			events: {
				...this.props.events,
				click: this.click.bind(this)
			}
		});

		this.children.searchInput.setProps({events: {
				// @ts-ignore
				input: this.findUsers.bind(this)
			}
		})
	}

	async click(e: Event) {
		const target = e.target as HTMLElement;

		if (target.hasAttribute('data-expel')) {
			e.preventDefault();
			const userId = target.getAttribute('data-expel');

			try {
				await ChatsController.deleteUsersFromChat({ users: [Number(userId)], chatId: this.props.currentChatId })
				target.setAttribute('data-invite', String(userId));
				target.removeAttribute('data-expel');
				target.textContent = 'Invite';
				target.classList.remove('btn_red');
				target.classList.add('btn_base');
			} catch (e) {
				console.error(e);
				target.setAttribute('disabled', 'true');
				target.textContent = 'Error'
			}
		}

		if (target.hasAttribute('data-invite')) {
			e.preventDefault();
			const userId = Number(target.getAttribute('data-invite'));
			try {
				await ChatsController.addUsersToChat({ users: [userId], chatId: this.props.currentChatId });
				target.setAttribute('data-expel', String(userId));
				target.removeAttribute('data-invite');
				target.textContent = 'Удалить';
				target.classList.remove('btn_base');
				target.classList.add('btn_red');
			} catch (e) {
				console.error(e);
				target.setAttribute('disabled', 'true');
				target.textContent = 'Error';
			}
		}

	}
	async loadChatMembers() {
		const chatMembers = await ChatsController.getChatUsers(this.props.currentChatId);
		chatMembers.forEach((member) => {
			member.isMember = true;
			if (member.role === 'admin') {
				member.isAdmin = true
			}
		});
		this.setProps({ currentChatMembers: chatMembers, users: chatMembers })
	}

	componentDidMount() {
		if(this.props.currentChatId){
			this.setProps({ isSearching: false, currentChatMembers: [], users: [] });
			console.log('this.props.currentChatId', this.props.currentChatId)
			this.chatData = ChatsController.getChatData(this.props.currentChatId);
			this.isAdmin = this.chatData.created_by === this.props.user_data?.id;
			this.loadChatMembers();
		}
	}



	findUsers(e: Event) {
		if (e.target instanceof HTMLInputElement) {
			const target = e.target;
			clearTimeout(this.searchBouncer);
			this.searchBouncer = setTimeout(async () => {
				if (target.value) {
					const users = await UserController.findUser({ login: target.value });
					users.forEach((user) => {
						user.isMember = this.props.currentChatMembers.findIndex(i => i.id === user.id) !== -1
					});
					this.setProps({ isSearching: true, users });
				} else {
					await this.loadChatMembers();
					this.setProps({ isSearching: false });
				}
			}, 700)
		}
	}

	render() {
		return this.compile(template, { ...this.props, isAdmin: this.isAdmin });
	}
}

const withState = withStore((state) => {
	return {
		currentChatId: state.currentChatId,
		user_data: state.user.user_data,
	}
});

console.log('ChatShowUsersBlock withState', withState)
export const ChatShowUsersBlock = withState(ChatShowUsersBlockBase as unknown as typeof Block);
