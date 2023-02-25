import {NotificationLayout} from "../../layouts/notification/notification-layout";
import {ErrorBlock} from "../../blocks/error-block/error-block";
import {NotificationLayoutLink} from "../../components/notification-layout-link/notification-layout-link";

const link = new NotificationLayoutLink({
	label: 'Назад к чатам',
	href: '#',
})
const errorBlock = new ErrorBlock({
	label:  '500',
	description: 'Мы уже фиксим',
	link
})

const errorPage = new NotificationLayout({
	component:  errorBlock,
})
export default errorPage; // test

