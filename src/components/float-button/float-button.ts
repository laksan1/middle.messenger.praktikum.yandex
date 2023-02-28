import Block from "../../utils/Block";
import template from "../notification-layout-link/notification-layout-link.hbs";

type FloatButtonProps = {
	href: string;
	events?: Record<string, (e?: Event) => void>;
}
export class  FloatButton extends Block<FloatButtonProps> {
	constructor(props: FloatButtonProps) {
		super('button', props);
		this.element!.classList.add('float-button');
	}

	protected render(): DocumentFragment {
		this.element!.setAttribute('href', this.props.href);
		return this.compile(template, {...this.props})
	}
}
