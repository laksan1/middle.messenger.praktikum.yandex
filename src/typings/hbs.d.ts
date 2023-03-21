declare module '*.hbs' {
	import { TemplateDelegate } from 'handlebars';

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	declare const template: TemplateDelegate;

	export default template;
}
