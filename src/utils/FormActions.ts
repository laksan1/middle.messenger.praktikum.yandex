import Validator, {ValidatorTypes} from './Validator';

export default function submit(e?: Event): void {
	if (!e) return;
	e.preventDefault();

	if (!(e.target instanceof HTMLFormElement)) return;

	const form = e.target;
	let isFormValid = true;

	Array.from(form.elements).forEach((elem) => {
		if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
			const validationType = elem.getAttribute('data-validation-type');
			if (!validationType) return;

			const validity = new Validator(elem, validationType as ValidatorTypes);

			const isInputValid = validity.check();
			if (!isInputValid) {
				isFormValid = false;
			}
		}
	});

	if (!isFormValid) {
		form.reportValidity();
	} else {
		const formData = new FormData(form as HTMLFormElement);
		const formObj: Record<string, unknown> = {};

		formData.forEach((value, key) => {
			formObj[key] = value;
		});
		console.log('Form data',formObj);
		form.reset();
	}
}
