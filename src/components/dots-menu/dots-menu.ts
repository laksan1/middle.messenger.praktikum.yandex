import Block from '../../utils/Block'
import template from './dots-menu.hbs'
import { PropsWithRouter, withRouter } from '../../hocs/withRouter'

interface DotsMenuProps extends PropsWithRouter {
	href: string;
	events?: Record<string, (e?: Event) => void>;

}

class DotsMenuWithoutRouter extends Block<DotsMenuProps> {
	constructor(props: DotsMenuProps) {
		super('a', props)
		this.element!.classList.add('dots')
		this.element!.addEventListener('click', this.navigate.bind(this))
	}

	navigate(e: Event) {
		e.preventDefault()
		this.props.router.go(this.props.href)
	}

	protected render() {
		this.element!.setAttribute('href', this.props.href)
		return this.compile(template, { ...this.props })
	}
}

export const DotsMenu = withRouter(DotsMenuWithoutRouter as unknown as typeof Block)
