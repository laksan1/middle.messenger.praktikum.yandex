import Block from "../../utils/Block";
import template from "./main-block.hbs";
import styles from './main-block.module.scss';

type MainBlockProps = {
	events?: Record<string, (e?: Event) => void>;
}

export class MainBlock extends Block<MainBlockProps> {
	constructor(props: MainBlockProps) {
		super('ul', props);
		this.element!.classList.add(styles.menu);
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
