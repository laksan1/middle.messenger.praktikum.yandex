import {NotificationLayout} from "../../layouts/notification/notification-layout";
import {NotificationLayoutLink} from "../../components/notification-layout-link/notification-layout-link";
import {NotFoundBlock} from "../../blocks/not-found-block/not-found-block";

const link = new NotificationLayoutLink({
	label: 'Назад к чатам',
	href: '../../pages/chat/chat.hbs',
})
const notFoundBlock = new NotFoundBlock({
	label:  '404',
	description: 'Не туда попали',
	link
})

const notFoundPage = new NotificationLayout({
	component:  notFoundBlock,
})
export default notFoundPage;

